const mongoose = require('mongoose')

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1:27017/nutrition'

mongoose
   .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
   .then((connect) => {
      console.log('connected to db')
   })
   .catch((err) => {
      console.log('could not connect to db: ', err)
   })

//SCHEMAS////////////////////////////////////////
const RecipeSchema = new mongoose.Schema({
   recipe_id: Number,
   name: String,
})

const UserSchema = new mongoose.Schema({
   total_calories: Number,
   total_CHO: Number,
   //    recipes: [RecipeSchema],
})

//Initiate models
const Recipe = mongoose.model('Recipe', RecipeSchema)
const User = mongoose.model('User', UserSchema)

module.exports = {
   Recipe,
   User,
}
