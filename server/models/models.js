//interacts with controllers and the database
const db = require('../database/db');

module.exports = {
   user: {
      save: async function (user) {
         //! error handling
         await db.User.create(user);
      },
      get: async function (name) {
         let user = await db.User.findOne({ username: name });
         return user;
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
         db.User.findOneAndUpdate(
            { username: name },
            metrics,
            function (err, success) {
               if (err) {
                  throw new Error(err);
               } else {
                  return success;
               }
            }
         );
      },
      deleteRecipeFromUser: async function (name, id) {
         await db.User.findOneAndUpdate(
            { username: name },
            { $pull: { recipes: { recipe_id: id } } }
         );
      },
   },
   recipe: {
      save: async function (recipe) {
         let response = await db.Recipe.create(recipe);
         return response;
      },
      delete: function (id) {
         db.Recipe.findOneAndDelete({ recipe_id: id }, (err, response) => {
            if (err) {
               throw new Error(err);
            } else {
               return response;
            }
         });
      },
   },
};
