//interacts with controllers and the database
const db = require('../database/db');

module.exports = {
   user: {
      save: async function (user) {
         try {
            let response = await db.User.create(user);
            return response;
         } catch (err) {
            throw new Error('could not create account');
         }
      },
      get: async function (name) {
         try {
            let user = await db.User.findOne({ username: name });
            return user;
         } catch (err) {
            throw new Error(err);
         }
      },
      update: function (name, recipe) {
         console.log('recipe:', recipe);
         const setter = {};
         setter[recipe.meal_type] = recipe;
         db.User.update(
            { username: name },
            { $push: setter },
            function (err, success) {
               if (err) {
                  console.log('err in models.update');
               } else {
                  console.log('success in update models: ', success);
                  return success;
               }
            }
         );
      },
      updateMetrics: function (name, metrics) {
         console.log('metrics:', metrics);
         db.User.update({ username: name }, metrics, function (err, success) {
            if (err) {
               console.log('err:', err);
            } else {
               console.log('success:', success);
               return success;
            }
         });
      },
   },
   recipe: {
      save: async function (recipe) {
         try {
            let response = await db.Recipe.create(recipe);
            return response;
         } catch (err) {
            throw new Error(err);
         }
      },
   },
};
