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
         db.User.findOneAndUpdate(
            { username: name },
            { $push: { recipes: recipe } },
            function (err, success) {
               if (err) {
                  throw new Error(err);
               } else {
                  return success;
               }
            }
         );
      },
      updateMetrics: function (name, metrics) {
         db.User.update({ username: name }, metrics, function (err, success) {
            if (err) {
               console.log('err:', err);
            } else {
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
