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
      save: function (userData) {
         models.user.save(userData).then((err) => {
            if (err) {
               console.log('err:', err)
            }
         })
         return userData
      },
   },
}
