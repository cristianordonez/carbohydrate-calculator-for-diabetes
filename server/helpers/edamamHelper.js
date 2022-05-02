const config = require('../config/config').EDAMAME_API;
const axios = require('axios');

module.exports = {
   //retrieves recipes from api matching search query from user input
   getRecipes: async function (query, meal, totalCal, totalCarb) {
      let calPerMeal;
      let carbsPerMeal;
      if (meal === 'Snack') {
         calPerMeal = Math.round(totalCal / 7);
         carbsPerMeal = Math.round(totalCarb / 7);
      } else {
         calPerMeal = Math.round((totalCal / 7) * 2);
         carbsPerMeal = Math.round((totalCarb / 7) * 2);
      }
      let q = encodeURI(query);
      let requestUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${
         config.app_id
      }&app_key=${config.app_key}&mealType=${meal}&calories=${
         calPerMeal - 100
      }-${calPerMeal + 100}&imageSize=REGULAR&nutrients%5BCHOCDF%5D=${
         carbsPerMeal - 5
      }-${carbsPerMeal + 5}`;

      let result = await axios.get(requestUrl);
      let response = {};
      response.data = result.data;
      response.calPerMeal = calPerMeal;
      response.carbsPerMeal = carbsPerMeal;
      return response;
   },
   //retrieves data from api using recipe id for single recipe
   getSingleRecipe: async function (recipe) {
      let requestUrl = `https://api.edamam.com/api/recipes/v2/${recipe.recipe_id}?type=public&app_id=${config.app_id}&app_key=${config.app_key}&field=images&field=url&field=yield&field=ingredientLines&field=calories&field=mealType&field=dishType&field=totalNutrients&field=label&field=shareAs&field=uri`;
      let result = await axios.get(requestUrl);
      let { data } = result;
      //add recipe meal type to response from api to avoid errors with meals that have multiple meal types
      data.meal_type = recipe.meal_type;
      return data;
   },
};
