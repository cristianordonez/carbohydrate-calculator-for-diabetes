const express = require('express');
const app = express();
const port = 1128;
const bodyParser = require('body-parser');
const controllers = require('./controllers/controllers');
const db = require('./database/db');
const apiHelperFuncs = require('./helpers/edamamHelper');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');
const config = require('./config/config');
const MongoStore = require('connect-mongo');

//MIDDLEWARE//////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
const corsOptions = {
   origin: 'http://127.0.0.1:1128',
   credentials: true,
};
app.use(cors(corsOptions));

const errorController = (err, req, res, next) => {
   console.log('err in error controller middleware:', err);
   res.status(500).send('error has occured in server');
};
//* error handler middleware
app.use(errorController);

const oneDay = 1000 * 60 * 60 * 24;

const sessionStore = new MongoStore({
   mongoUrl: 'mongodb://127.0.0.1:27017/nutrition',
   collectionName: 'sessions',
});

app.use(
   session({
      secret: config.SECRET.SESSION_SECRET,
      name: 'session_name',
      saveUninitialized: false,
      cookie: { maxAge: oneDay, sameSite: true },
      resave: false,
      store: sessionStore,
   })
);

const asyncHandler = (fn) => (req, res, next) =>
   Promise.resolve(fn(req, res, next)).catch(next);

app.use(
   '/login',
   asyncHandler(async (req, res, next) => {
      let user = await controllers.user.getByUsername(req.query.username);
      //if user with matching username eixsts, check their password with hashed password
      if (user) {
         const match = await bcrypt.compare(req.query.password, user.password);
         //if passwords match, set session authentication to true, and place username into session
         if (match) {
            req.session.username = req.query.username;
            req.session.isAuthenticated = true;
            // next();
            //otherwise send status code error
         } else {
            // res.status(401).send('Incorrect password.');
            req.session.isAuthenticated = false;
         }
         //if user does not exist, send status code to client
      } else {
         // res.status(401).send('User does not exist.');
         req.session.isAuthenticated = false;
         // next();
      }
      next();
   })
);

//* middleware that checks if current user is authenticated on every request
const sessionChecker = (req, res, next) => {
   if (req.session.isAuthenticated) {
      next();
   } else {
      res.status(401).send('User is not authenticated.');
   }
};

//* user session will be verified on all requests to these private routes
app.use('/recipes', sessionChecker);
app.use('/metrics', sessionChecker);
app.use('/mealplan', sessionChecker);
//END MIDDLEWARE//////////////////////////////////////////

//ROUTES//////////////////////////////////////////////

// data = {
//     username: string
//     password: string
// }
//* handles requests to login
app.get('/login', (req, res) => {
   if (req.session.isAuthenticated) {
      res.send(req.query.username);
   } else {
      res.status(401).send('Incorrect username or password');
   }
});

// data = {
//    username:
//    password:
// }
//* handles request to create an account
app.post('/signup', (req, res) => {
   controllers.user.saveNewUser(req, res);
});

//* handles logout requests by destroying the session
app.get('/logout', sessionChecker, (req, res) => {
   req.session.destroy();
   res.send('Successfully logged out.');
});

// data = {
//  height: inches,
//  weight: lbs,
//  age: number,
//  gender: string, 'Male', 'Female', 'Prefer not to answer'
//  activityLevel: number between 1 to 2
// }
//* handles request for user metrics
app.post('/metrics', sessionChecker, (req, res) => {
   controllers.user.calculateKcalCarbReq(req, res);
});

//todo handles getting metric data if it exists from database
app.get('/metrics', (req, res) => {
   controllers.user.getByUsername(req, res);
});
//// app.get('/metrics', (req, res) => {
////    let user = controllers.user.getByUsername(req.session.username);
////    user.then((userData) => {
////       let metrics = {};
////       metrics.total_CHO = userData.total_CHO;
////       metrics.total_calories = userData.total_calories;
////       res.send(metrics);
////    });
//// });

// data = {
//     query:
//     meal: Breakfast, Lunch, or Dinner
// }
//todo handles request to api for recipes
app.get('/recipes', (req, res) => {
   controllers.recipe.get(req, res);
});
////app.get('/recipes', (req, res) => {
////   let session = req.session;
////   let currentUser = controllers.user.getByUsername(req.session.username);
////   currentUser.then((user) => {
////      let response = apiHelperFuncs.getRecipes(
////         req.query.query,
////         req.query.meal,
////         user.total_calories,
////         user.total_CHO
////      );
////      response.then((data) => {
////         let response = {};
////         response.metrics = session.metrics;
////         response.calPerMeal = data.calPerMeal;
////         response.carbsPerMeal = data.carbsPerMeal;
////         response.body = data.data.hits;
////         res.send(response);
////      });
////   });
////});

// data = {
//     recipe_id: Number,
//     recipe_name: string;
// }
//* handles post requests to save recipes
app.post('/recipes', (req, res) => {
   let session = req.session;
   //save recipe to recipe collection, then save it to specific user
   let promise = controllers.recipe.save(req.body);
   promise.then((createdRecipe) => {
      //check if recipe was unable to be saved to db due to duplicate error
      if (!createdRecipe.recipe_id) {
         res.status(401).json(createdRecipe);
      } else {
         //get username from req.session
         let promiseData = controllers.user.saveRecipeToUser(
            session.username,
            createdRecipe
         );
         promiseData.then((success) => {
            console.log('success:', success);
            //handles when duplicate recipe is found in database
            //// if (!success) {
            //   // res.status(409).send('Recipe has already been saved!');
            //// } else {
            res.send('Successfully posted recipe!');
         });
         //catch additional errors when saving recipe to recipe DB
         promiseData.catch((err) => {
            console.error('err:', err);
         });
      }
   });
   //catches all errors
   promise.catch((err) => {
      res.status(401).json(err);
   });
});

//* helper func to get all recipes data stored in db from api, since api does not allow caching of certain elements
async function getPromises(recipes) {
   let promises = [];
   for (let i = 0; i < recipes.length; i++) {
      promises.push(apiHelperFuncs.getSingleRecipe(recipes[i].recipe_id));
   }
   let currentPromise = Promise.all(promises).then((data) => {
      return data;
   });
   return currentPromise;
}

//TODO fix error with recipes being rendered in wrong section of page on client side(try saving recipes in their own object before calling api for additional recipe info)
//* handles request for getting saved recipes of user, getting data for each recipe from api
app.get('/mealplan', (req, res) => {
   let promises = [];
   let promise = controllers.user.getByUsername(req.session.username);
   promise.then((user) => {
      let result = getPromises(user.recipes);
      result.then((arrayOfRecipes) => {
         let body = {};
         body.username = req.session.username;
         body.recipes = arrayOfRecipes;
         res.send(body);
      });
   });
});

//* handles request for deleting saved recipes of user
app.post('/mealplan', (req, res) => {
   //delete recipe from recipes collection
   console.log('req.body:', req.body);
   let promise = controllers.recipe.delete(req.body.recipe_id);
   promise.then((success) => {
      let currentPromise = controllers.user.deleteRecipeFromUser(
         req.session.username,
         req.body.recipe_id
      );
      currentPromise.then((response) => {
         res.send('Recipe has been deleted!');
      });
   });
   //then delete recipe from users collection

   //then send response back to client
});
//END ROUTES//////////////////////////////////////////////

app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});

// app.get('/', (req, res, next) => {
//    res.status(200).json({
//       status: 'success',
//       data: {
//          name: 'diabetes-app',
//          version: '0.1.0',
//       },
//    })
// })
