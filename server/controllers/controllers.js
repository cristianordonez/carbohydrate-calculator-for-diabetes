//interacts with server and the model

const models = require('../models/models')

module.exports = {
   user: {
      calculateKcalCarbReq: function (metrics) {
         let weightInKg = metrics.weight / 2.2
         let heightInCm = Math.floor(metrics.height * 2.54)
         let additionalCalories = metrics.gender === 'Female' ? -161 : 5
         let rmr =
            10 * weightInKg +
            6.25 * heightInCm -
            5 * metrics.age +
            additionalCalories
         //adjust for activity level
         let result = {}
         result.total_calories = Math.floor(rmr * metrics.activityLevel)
         result.total_CHO = Math.floor((rmr * 0.5) / 4)
         return result
      },
      //todo update this function so it updates the user instead of creating new one
      save: async function (userData) {
         try {
            let response = await models.user.save(userData)
            return response
         } catch (err) {
            throw new Error('could not create account')
         }
         //  return userData
      },
      getUsername: async function (username) {
         try {
            let result = await models.user.get(username)
            console.log('result:', result)
         } catch (err) {
            console.log('err:', err)
         }
      },
   },
}
