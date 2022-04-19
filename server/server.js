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
const { v4: uuidv4 } = require('uuid')
const MongoStore = require('connect-mongo')

//MIDDLEWARE//////////////////////////////////////////
// app.use(express.static(__dirname + '/../client/dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.static('client'))
app.use(express.static(__dirname + '/../client/dist'))
app.use(cors())

const oneDay = 1000 * 60 * 60 * 24

const sessionStore = new MongoStore({
   mongoUrl: 'mongodb://127.0.0.1:27017/nutrition',
   collectionName: 'sessions',
})

app.use(
   session({
      genid: function (req) {
         return uuidv4()
      },
      secret: config.SECRET.SESSION_SECRET,
      saveUninitialized: true,
      saveUninitialized: false,
      cookie: { maxAge: oneDay, sameSite: true },
      resave: false,
      store: sessionStore,
   })
)

//ROUTES//////////////////////////////////////////////

// data = {
//     username: string
//     password: string
// }
//* handles requests to login
app.post('/login', (req, res) => {
   req.session.destroy()
   console.log(req.session.id)
   console.log(req.session.name)
   console.log('req.body:', req.body)
   //if valid login attempt
   res.send('sucess')
})

// data = {
//    username:
//    password:
// }
//* handles request to create an account
app.post('/signup', (req, res) => {
   const passwordHash = bcrypt.hashSync('Pa$$w0rd', 10)
   console.log('passwordHash:', passwordHash)
   req.body.password = passwordHash
   controllers.user
      .save(req.body)
      .then((response) => {
         console.log('response worked server:', response)
         res.statusCode = 200
         res.send('Success!')
      })
      .catch((err) => {
         console.log('err in server:', err)
         res.statusCode = 400
         res.send('Could not create account')
      })

   //    res.redirect('/login')
})

app.get('/logout', (req, res) => {
   req.session.destroy()
   //    res.redirect('/login')
})

// data = {
//  height: inches,
//  weight: lbs,
//  age: number,
//  gender: string, 'Male', 'Female', 'Prefer not to answer'
//  activityLevel: number between 1 to 2
// }

//* handles request for user metrics
app.post('/:user/metrics', (req, res) => {
   let userData = controllers.user.calculateKcalCarbReq(req.body.metrics)
   //todo update userData so it also contains the username or userId from cookies or session
   //    controllers.user.save(userData)
   res.send(userData)
})

// data = {
//     query:
//     meal: Breakfast, Lunch, or Dinner
// }
//handles request to api for recipes
app.get('/:user/recipes', (req, res) => {
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
//     name: string;
// }
//handles post requests to save recipes
app.post('/:user/recipes', (req, res) => {})

app.listen(port, () => {
   console.log(`Server listening on port ${port}`)
})

app.get('/', (req, res, next) => {
   res.status(200).json({
      status: 'success',
      data: {
         name: 'github-fetcher',
         version: '0.1.0',
      },
   })
})
