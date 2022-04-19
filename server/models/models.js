//interacts with controllers and the database
const db = require('../database/db')

module.exports = {
   user: {
      save: async function (user) {
         try {
            let response = await db.User.create(user)
            return response
         } catch (err) {
            throw new Error('could not create account')
         }
      },
      get: async function (name) {
         try {
            let user = await db.User.findOne({ username: name })
            console.log('user:', user)
            return user
         } catch (err) {
            console.log('err:', err)
         }
      },
   },
}
