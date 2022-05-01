//interacts with server and the model
const models = require('../models/models');
const bcrypt = require('bcrypt');

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
      saveNewUser: async function (req, res, next) {
         let saltRounds = 10;
         bcrypt.hash(
            req.body.password,
            saltRounds,
            function (err, hashedPassword) {
               if (err) {
                  throw new Error(err);
               } else {
                  req.body.password = hashedPassword;
                  try {
                     let promise = models.user.save(req.body);
                     promise.then((response) => {
                        res.statusCode = 200;
                        res.send('Success!');
                     });
                     promise.catch((err) => {
                        res.status(401).send({ rtnCode: 1 });
                     });
                  } catch (err) {
                     console.log('err in saveNewUser:', err);
                  }
               }
            }
         );
      },
      // saveNewUser: async function (userData) {
      //    try {
      //       let response = await models.user.save(userData);
      //       return response;
      //    } catch (err) {
      //       throw new Error('could not create account');
      //    }
      // },
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
            return err;
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
      deleteRecipeFromUser: async function (username, recipe_id) {
         try {
            await models.user.deleteRecipeFromUser(username, recipe_id);
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
            // throw new Exception(err);
            console.error(err);
         }
      },
      delete: async function (recipe_id) {
         try {
            let promise = await models.recipe.delete(recipe_id);
            return promise;
         } catch (err) {
            // throw new Error(err);
            // return err;
            console.error(err);
         }
      },
   },
};
