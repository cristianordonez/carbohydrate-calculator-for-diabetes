//interacts with controllers and the database
const db = require('../database/db')

module.exports = {
   user: {
      save: async function (user) {
         await db.User.create(user)
      },
   },
}
