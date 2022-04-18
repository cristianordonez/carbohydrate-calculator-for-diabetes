const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const controllers = require('./controllers/controllers')
const db = require('./database/db')
const apiHelperFuncs = require('./helpers/edamamHelper')
const passport = require('passport')
const localPassport = require('passport-local')
//MIDDLEWARE//////////////////////////////////////////
app.use(express.static('client/dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//ROUTES//////////////////////////////////////////////


// temporary database for users
const USERS = {
    'user1': 'password1',
    'user2': 'password2'
}

//handles requests to login
app.post('/login') {

}

//handles request to create an account
app.post('signup') {

}

// data = {
//  height: inches,
//  weight: lbs,
//  age: number,
//  gender: string, 'Male', 'Female', 'Prefer not to answer'
//  activityLevel: number between 1 to 2
// }

//handles request for user metrics
app.post('/:user/metrics', (req, res) => {
   let userData = controllers.user.calculateKcalCarbReq(req.body.metrics)
   controllers.user.save(userData)
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
//     image: string;
// }
//handles post requests to save recipes
app.post('/:user/recipes', (req, res) => {


})

app.listen(port, () => {
   console.log(`Server listening on port ${port}`)
})
