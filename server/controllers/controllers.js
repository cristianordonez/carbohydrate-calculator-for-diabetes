//interacts with server and the model

const models = require('../models/models');

module.exports = {
   user: {
      calculateKcalCarbReq: function (metrics) {
         let weightInKg = metrics.weight / 2.2;
         let heightInCm = Math.floor(metrics.height * 2.54);
         let additionalCalories = metrics.gender === 'female' ? -161 : 5;
         let rmr =
            10 * weightInKg +
            6.25 * heightInCm -
            5 * metrics.age +
            additionalCalories;
         //adjust for activity level
         let result = {};
         result.total_calories = Math.floor(rmr * metrics.activityLevel);
         result.total_CHO = Math.floor((rmr * 0.5) / 4);
         return result;
      },
      save: async function (userData) {
         try {
            let response = await models.user.save(userData);
            return response;
         } catch (err) {
            throw new Error('could not create account');
         }
      },
      getByUsername: async function (username) {
         try {
            let result = await models.user.get(username);
            return result;
         } catch (err) {
            throw new Error(err);
         }
      },
      getUsernameRecipes: async function (username) {
         try {
            let result = await models.users.getRecipes(username);
            return result;
         } catch (err) {
            throw new Error(err);
         }
      },
      saveRecipeToUser: async function (username, recipe) {
         try {
            let promise = await models.user.update(username, recipe);
            return promise;
         } catch (err) {
            throw new Error(err);
         }
      },
      updateUserMetrics: async function (username, metrics) {
         try {
            let promise = await models.user.updateMetrics(username, metrics);
            return promise;
         } catch (err) {
            throw new Error(err);
         }
      },
   },
   recipe: {
      save: async function (recipe) {
         try {
            let promise = await models.recipe.save(recipe);
            return promise;
         } catch (err) {
            throw new Error(err);
         }
      },
   },
};
