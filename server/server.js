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
    let user = await controllers.user.getByUsername(req.body.username);
    //if user with matching username eixsts, check their password with hashed password
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      //if passwords match, set session authentication to true, and place username into session
      if (match) {
        req.session.username = req.body.username;
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

// app.use('/login', authenticateUser);
//todo add this to routes we want to check if user is logged in, adding before every route, and dealing with cookies
// consider saving session id to req.session, then on every request try searching the database to see if this session exists, and if it does, continue, otherwise do something else
const sessionChecker = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).send({ rtnCode: 1 });
  }
};
//END MIDDLEWARE//////////////////////////////////////////

//ROUTES//////////////////////////////////////////////

// data = {
//     username: string
//     password: string
// }
//* handles requests to login
app.post('/login', (req, res) => {
  //todo check if user has metrics saved on db, if so return it in session
  if (req.session.isAuthenticated) {
    res.send(req.body.username);
  } else {
    res.status(401).send('Incorrect username or password');
  }

  // req.session.send()
});

// data = {
//    username:
//    password:
// }
//* handles request to create an account
app.post('/signup', (req, res) => {
  let saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
    if (err) {
      throw new Error(err);
    } else {
      req.body.password = hashedPassword;
      controllers.user
        .save(req.body)
        .then((response) => {
          res.statusCode = 200;
          res.send('Success!');
        })
        .catch((err) => {
          res.status(401).send({ rtnCode: 1 });
        });
    }
  });
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
  let userData = controllers.user.calculateKcalCarbReq(req.body);
  //    controllers.user.save(userData)
  controllers.user.updateUserMetrics(req.session.username, userData);
  req.session.metrics = userData;
  res.send(userData);
});

//todo handles getting metric data if it exists from database
app.get('/metrics', (req, res) => {
  let user = controllers.user.getByUsername(req.session.username);
  user.then((userData) => {
    let metrics = {};
    metrics.total_CHO = userData.total_CHO;
    metrics.total_calories = userData.total_calories;
    res.send(metrics);
  });
});

// data = {
//     query:
//     meal: Breakfast, Lunch, or Dinner
// }
//* handles request to api for recipes
app.get('/recipes', (req, res) => {
  //todo handle user with unique id by searching for his total calories and carbs then sending to helper function

  let session = req.session;
  let response = apiHelperFuncs.getRecipes(
    req.query.query,
    req.query.meal,
    session.metrics.total_calories,
    session.metrics.total_CHO
  );
  response.then((data) => {
    console.log('data:', data);
    console.log('req.session:', req.session);
    let response = {};
    response.metrics = req.session.metrics;
    response.body = data;
    res.send(response);
  });
});

// data = {
//     recipe_id: Number,
//     recipe_name: string;
// }
//* handles post requests to save recipes
app.post('/recipes', (req, res) => {
  let session = req.session;
  //then get username model from DB from req.sessions
  let promise = controllers.recipe.save(req.body);
  promise.then((createdRecipe) => {
    let promiseData = controllers.user.saveRecipeToUser(
      session.username,
      createdRecipe
    );
    promiseData.then((success) => {
      res.send('Successfully posted recipe!');
    });
    promiseData.catch((err) => {
      throw new Error(err);
    });
  });
  promise.catch((err) => {
    res.status(401).send({ rtnCode: 1 });
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

//* handles request for saved recipes of user, getting data for each recipe from api
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
