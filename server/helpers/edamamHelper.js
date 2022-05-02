const config = require('../config/config').EDAMAME_API;
const axios = require('axios');

module.exports = {
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
         calPerMeal - 150
      }-${calPerMeal + 150}&imageSize=REGULAR&nutrients%5BCHOCDF%5D=${
         carbsPerMeal - 10
      }-${carbsPerMeal + 10}`;

      try {
         let result = await axios.get(requestUrl);
         let response = {};
         response.data = result.data;
         response.calPerMeal = calPerMeal;
         response.carbsPerMeal = carbsPerMeal;
         return response;
      } catch (err) {
         throw new Error(err);
      }
   },
   getSingleRecipe: async function (recipe_id) {
      let requestUrl = `https://api.edamam.com/api/recipes/v2/${recipe_id}?type=public&app_id=${config.app_id}&app_key=${config.app_key}&field=images&field=url&field=yield&field=ingredientLines&field=calories&field=mealType&field=dishType&field=totalNutrients&field=label&field=shareAs&field=uri`;
      try {
         let result = await axios.get(requestUrl);
         return result.data;
      } catch (err) {
         throw new Error(err);
      }
   },
};
