const mongoose = require('mongoose')

main().catch((err) => console.log(err))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test')
}

//SCHEMAS////////////////////////////////////////
const RecipeSchema = new mongoose.Schema({
    recipe_id: Number,
    name: String,
    image: String,
})

const UserSchema = new mongoose.Schema({
    user_id: Number,
    username: String,
    total_calories: Number,
    total_CHO: Number,
    recipes: [RecipeSchema],
})

//MODELS////////////////////////////////////////
const User = mongoose.model('User', UserSchema)
const Recipe = mongoose.model('Recipe', RecipeSchema)

//CONTROLLERS////////////////////////////////
