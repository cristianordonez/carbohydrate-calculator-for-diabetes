const express = require('express')
const app = express()
const port = 1128
const bodyParser = require('body-parser')
const controllers = require('./controllers/controllers')
const db = require('./database/db')
const apiHelperFuncs = require('./helpers/edamamHelper')
const session = require('express-session')
const cors = require('cors')
const bcrypt = require('bcrypt')
const config = require('./config/config')
const MongoStore = require('connect-mongo')

//MIDDLEWARE//////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'))
const corsOptions = {
   origin: 'http://127.0.0.1:1128',
   credentials: true,
}
app.use(cors(corsOptions))

const oneDay = 1000 * 60 * 60 * 24

const sessionStore = new MongoStore({
   mongoUrl: 'mongodb://127.0.0.1:27017/nutrition',
   collectionName: 'sessions',
})

async function authenticateUser(username, password) {
   let actualPassword = controllers.user.getByUsername(username)
   let hashedPassword = await actualPassword.then((storedUser) => {
      if (storedUser) {
         return storedUser.password
      } else {
         console.log('user is not authenticated')
         return new Error('password does nto match')
      }
   })
   const match = await bcrypt.compare(password, hashedPassword)
   return match
}

app.use(
   session({
      secret: config.SECRET.SESSION_SECRET,
      name: 'session_name',
      saveUninitialized: false,
      cookie: { maxAge: oneDay, sameSite: true },
      resave: false,
      store: sessionStore,
   })
)

//todo add this to routes we want to check if user is logged in, adding before every route, and dealing with cookies
const sessionChecker = (req, res, next) => {
   if (req.session.user && req.cookies.users_id) {
      res.redirect('/')
   } else {
      next()
   }
}
//ROUTES//////////////////////////////////////////////

// data = {
//     username: string
//     password: string
// }

//* handles requests to login
app.post('/login', (req, res) => {
   let session = req.session
   let isAuthenticated = authenticateUser(req.body.username, req.body.password)
   isAuthenticated.then((isValid) => {
      req.session.id = session.id
      req.session.username = req.body.username
      console.log('isValid:', isValid)
      if (isValid) {
         req.session.save((err) => {
            if (err) {
               console.log('err:', err)
            } else {
               res.send(req.session.user)
            }
         })
      } else {
         res.status(401).send({ rtnCode: 1 })
      }
   })
})

// data = {
//    username:
//    password:
// }
//* handles request to create an account
app.post('/signup', (req, res) => {
   let saltRounds = 10
   bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
      if (err) {
         console.log('err:', err)
      } else {
         req.body.password = hashedPassword
         controllers.user
            .save(req.body)
            .then((response) => {
               res.statusCode = 200
               res.send('Success!')
            })
            .catch((err) => {
               res.status(401).send({ rtnCode: 1 })
            })
      }
   })
})

//* handles logout requests by destroying the session
app.get('/logout', (req, res) => {
   req.session.destroy()
})

// data = {
//  height: inches,
//  weight: lbs,
//  age: number,
//  gender: string, 'Male', 'Female', 'Prefer not to answer'
//  activityLevel: number between 1 to 2
// }
//* handles request for user metrics
app.post('/metrics', (req, res) => {
   let userData = controllers.user.calculateKcalCarbReq(req.body)
   //todo update userData so it also contains the username or userId from cookies or session
   //    controllers.user.save(userData)
   res.send(userData)
})

// data = {
//     query:
//     meal: Breakfast, Lunch, or Dinner
// }
//* handles request to api for recipes
app.get('/recipes', (req, res) => {
   //todo handle user with unique id by searching for his total calories and carbs then sending to helper function

   let kcalPerDay = 1800
   let carbsPerDay = 201
   let response = apiHelperFuncs.getRecipes(
      req.body.query,
      req.body.meal,
      kcalPerDay,
      carbsPerDay
   )
   response.then((data) => {
      res.send(data)
   })
})

// data = {
//     recipe_id: Number,
//     recipe_name: string;
// }
//* handles post requests to save recipes
app.post('/recipes', (req, res) => {
   let session = req.session
   //then get username model from DB from req.sessions
   let promise = controllers.recipe.save(req.body)
   promise.then((createdRecipe) => {
      let promiseData = controllers.user.saveRecipeToUser(
         session.username,
         createdRecipe
      )
      promiseData.then((success) => {
         res.send('Successfully posted recipe!')
      })
      promiseData.catch((err) => {
         console.log('err in promise data catch:', err)
      })
   })
   promise.catch((err) => {
      console.log('err:', err)
      res.status(401).send({ rtnCode: 1 })
   })
})

//* helper func to get all recipes data stored in db from api, since api does not allow caching of certain elements
async function getPromises(recipes) {
   let promises = []
   for (let i = 0; i < recipes.length; i++) {
      promises.push(apiHelperFuncs.getSingleRecipe(recipes[i].recipe_id))
   }
   let currentPromise = Promise.all(promises).then((data) => {
      return data
   })
   return currentPromise
}

//* handles request for saved recipes of user, getting data for each recipe from api
app.get('/mealplan', (req, res) => {
   let promises = []
   let promise = controllers.user.getByUsername(req.session.username)
   promise.then((user) => {
      let result = getPromises(user.recipes)
      result.then((arrayOfRecipes) => {
         res.send(arrayOfRecipes)
      })
   })
})

app.listen(port, () => {
   console.log(`Server listening on port ${port}`)
})

app.get('/', (req, res, next) => {
   res.status(200).json({
      status: 'success',
      data: {
         name: 'diabetes-app',
         version: '0.1.0',
      },
   })
})
