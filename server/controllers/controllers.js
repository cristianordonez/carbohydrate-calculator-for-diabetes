//interacts with server and the model
const models = require('../models/models');
const bcrypt = require('bcrypt');
const apiHelperFuncs = require('../helpers/edamamHelper');

module.exports = {
   user: {
      calculateKcalCarbReq: function (req, res, next) {
         let weightInKg = req.body.weight / 2.2;
         let heightInCm = Math.floor(req.body.height * 2.54);
         let additionalCalories = req.body.gender === 'female' ? -161 : 5;
         let rmr =
            10 * weightInKg +
            6.25 * heightInCm -
            5 * req.body.age +
            additionalCalories;
         //adjust for activity level
         let result = {};
         result.total_calories = Math.floor(rmr * req.body.activityLevel);
         result.total_CHO = Math.floor((rmr * 0.5) / 4);
         //after finding total kcal and CHO, update db with these metrics
         let promise = this.updateUserMetrics(req.session.username, result);
         promise.then((response) => {
            req.session.metrics = result;
            res.send(result);
         });
         promise.catch((err) => {
            console.log('err in update user metrics:', err);
            res.send('error updating metrics');
         });
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
                        res.status(200).send('Success!');
                     });
                     promise.catch((err) => {
                        res.status(401).send({ rtnCode: 1 });
                     });
                  } catch (err) {
                     console.log('err in saveNewUser:', err);
                     res.send(400).send('Error creating user.');
                  }
               }
            }
         );
      },
      getByUsername: async function (req, res, next) {
         try {
            let result = await models.user.get(req.session.username);
            let { total_CHO, total_calories } = result;
            let metrics = { total_CHO, total_calories };
            res.send(metrics);
         } catch (err) {
            res.status(401).send('Could not get metrics.');
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
      get: async function (req, res, next) {
         try {
            let currentUser = await models.user.get(req.session.username);
            apiHelperFuncs
               .getRecipes(
                  req.query.query,
                  req.query.meal,
                  currentUser.total_calories,
                  currentUser.total_CHO
               )
               .then((data) => {
                  let { calPerMeal, carbsPerMeal } = data;
                  let response = { calPerMeal, carbsPerMeal };
                  response.body = data.data.hits;
                  response.metrics = req.session.metrics;
                  res.send(response);
               });
         } catch (err) {
            console.log('err:', err);
            res.status(400).send('Incorrect query');
         }
      },
   },
};
