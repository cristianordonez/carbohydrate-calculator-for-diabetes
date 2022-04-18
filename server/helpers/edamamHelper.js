const config = require('../config/config').EDAMAME_API
const axios = require('axios')
console.log('config:', config)

module.exports = {
   getRecipes: async function (query, meal, totalCal, totalCarb) {
      let calPerMeal = Math.round(totalCal / 3)
      let calMin = calPerMeal - 150
      let calMax = calPerMeal + 150
      let carbsPerMeal = Math.round(totalCarb / 3)
      let carbMin = carbsPerMeal - 10
      let carbMax = carbsPerMeal + 10
      let q = encodeURI(query)
      let requestUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${config.app_id}&app_key=${config.app_key}&mealType=${meal}&calories=${calMin}-${calMax}&imageSize=REGULAR&nutrients%5BCHOCDF%5D=${carbMin}-${carbMax}`
      try {
         let result = await axios.get(requestUrl)
         return result.data
      } catch (err) {
         console.log('err:', err)
      }
   },
}
