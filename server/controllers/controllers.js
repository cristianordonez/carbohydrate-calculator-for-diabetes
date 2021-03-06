//interacts with server and the model
const models = require('../models/models');
const bcrypt = require('bcrypt');
const apiHelperFuncs = require('../helpers/edamamHelper');

module.exports = {
   user: {
      get: async function (username) {
         let promise = await models.user.get(username);
         return promise;
      },
      calculateKcalCarbReq: function (req, res) {
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
            res.send('error updating metrics');
         });
      },
      updateKcalCarbReq: async function (req, res) {
         try {
            let response = await models.user.updateMetrics(
               req.session.username,
               req.body
            );
            //then send back metrics to client to update state
            res.send(req.body);
         } catch (err) {
            res.send(err);
         }
      },
      saveNewUser: function (req, res) {
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
                     models.user
                        .save(req.body)
                        .then((response) => {
                           res.status(200).send('Success!');
                        })
                        .catch((err) => {
                           //error creating new user
                           res.status(409).send('Username already exists.');
                           return;
                        });
                  } catch (err) {
                     //error in hashing password
                     res.status(400).send('Error creating user.');
                  }
               }
            }
         );
      },
      getByUsername: async function (req, res) {
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
      save: async function (req, res) {
         try {
            let response = await models.recipe.save(req.body);
            if (!response.recipe_id) {
               res.status(401).json(response);
            } else {
               req.session.savedRecipe = response;
               this.saveRecipeToUser(req, res);
            }
         } catch (err) {
            console.error(err);
            res.send('Error saving recipe');
         }
      },
      saveRecipeToUser: async function (req, res) {
         try {
            let promise = await models.user.update(
               req.session.username,
               req.session.savedRecipe
            );
            res.send('Successfully posted recipe!');
         } catch (err) {
            res.status(401).send('Recipe already exists in users account.');
         }
      },
      delete: async function (req, res) {
         try {
            await models.recipe.delete(req.body.recipe_id);
            await this.deleteRecipeFromUser(
               req.session.username,
               req.body.recipe_id
            );
            //todo get updated recipes from database and return to client
            this.getUserRecipes(req, res);
         } catch (err) {
            res.status(401).send('Could not delete recipe.');
         }
      },
      deleteRecipeFromUser: async function (username, id) {
         try {
            await models.user.deleteRecipeFromUser(username, id);
         } catch (err) {
            console.log('err:', err);
         }
      },
      get: async function (req, res, next) {
         try {
            let currentUser = await models.user.get(req.session.username);
            //check to see if user has not entered metrics, and send error back to client if they have not
            if (!currentUser.total_calories || !currentUser.total_CHO) {
               res.status(424).send(
                  'Please enter metrics before searching for recipes.'
               );
               return;
            }
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
            res.status(400).send('No recipes found. Please try again.');
         }
      },
      getPromises: async function (recipes) {
         let promises = [];
         for (let i = 0; i < recipes.length; i++) {
            promises.push(apiHelperFuncs.getSingleRecipe(recipes[i]));
         }
         let currentPromise = Promise.all(promises).then((data) => {
            return data;
         });
         return currentPromise;
      },
      getUserRecipes: async function (req, res) {
         try {
            let user = await models.user.get(req.session.username);
            let result = this.getPromises(user.recipes);
            result.then((arrayOfRecipes) => {
               let body = {};
               body.username = req.session.username;
               body.recipes = arrayOfRecipes;
               res.send(body);
            });
         } catch (err) {
            res.status(401).send('Error retrieving recipes from db');
         }
      },
   },
};
