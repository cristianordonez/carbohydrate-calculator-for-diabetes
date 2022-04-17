const express = require('express')
const app = express()
const port = 3000

//MIDDLEWARE
app.use(express.static('client/dist'))

//ROUTES
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
