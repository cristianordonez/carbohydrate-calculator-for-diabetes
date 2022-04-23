const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1:27017/nutrition';

mongoose
   .connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
   })
   .then((connect) => {
      console.log('connected to db');
   })
   .catch((err) => {
      throw new Error(err);
   });

//SCHEMAS////////////////////////////////////////
const RecipeSchema = new mongoose.Schema(
   {
      recipe_id: { type: String, unique: true },
      recipe_name: String,
      meal_type: String,
   },
   { versionKey: false }
);

const UserSchema = new mongoose.Schema({
   username: { type: String, unique: true },
   password: String,
   total_calories: Number,
   total_CHO: Number,
   recipes: [],
});

UserSchema.plugin(uniqueValidator);
RecipeSchema.plugin(uniqueValidator);
//Initiate models
const Recipe = mongoose.model('Recipe', RecipeSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
   mongoose,
   User,
   Recipe,
};
