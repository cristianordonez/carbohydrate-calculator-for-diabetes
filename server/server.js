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
      let user = await controllers.user.get(req.query.username);
      //if user with matching username eixsts, check their password with hashed password
      if (user) {
         const match = await bcrypt.compare(req.query.password, user.password);
         //if passwords match, set session authentication to true, and place username into session
         if (match) {
            req.session.username = req.query.username;
            req.session.isAuthenticated = true;
            //otherwise send status code error
         } else {
            req.session.isAuthenticated = false;
         }
         //if user does not exist, send status code to client
      } else {
         req.session.isAuthenticated = false;
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

//* handles requests to login
app.get('/login', (req, res) => {
   if (req.session.isAuthenticated) {
      res.send(req.query.username);
   } else {
      res.status(401).send('Incorrect username or password');
   }
});

//* handles request to create an account
app.post('/signup', (req, res) => {
   controllers.user.saveNewUser(req, res);
});

//* handles logout requests by destroying the session
app.get('/logout', sessionChecker, (req, res) => {
   req.session.destroy();
   res.send('Successfully logged out.');
});

//* handles request for user metrics
app.post('/metrics', sessionChecker, (req, res) => {
   controllers.user.calculateKcalCarbReq(req, res);
});

//* handles getting metric data if it exists from database
app.get('/metrics', (req, res) => {
   controllers.user.getByUsername(req, res);
});

//* handles request to api for recipes
app.get('/recipes', (req, res) => {
   controllers.recipe.get(req, res);
});

//* handles post requests to save recipes
app.post('/recipes', (req, res) => {
   controllers.recipe.save(req, res);
});

//* handles request for getting saved recipes of user, getting data for each recipe from api
app.get('/mealplan', (req, res) => {
   controllers.recipe.getUserRecipes(req, res);
});

//* handles request for deleting saved recipes of user
app.post('/mealplan', (req, res) => {
   controllers.recipe.delete(req, res);
   // controllers.recipe.getUserRecipes(req, res);
});

//* handles editing total calories and carbs for user
app.patch('/metrics', (req, res) => {
   console.log('here in patch');
   controllers.user.updateKcalCarbReq(req, res);
});
app.options('/', (req, res) => res.send());
//END ROUTES//////////////////////////////////////////////

app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});
