const express = require('express')
const app = express()
const pool = require('./db')
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 3000

//import routes
const userRoutes = require('./routes/user')
const listRoutes = require('./routes/list')
const itemRoutes = require('./routes/item')
const participantRoutes = require('./routes/participant')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//use routes
app.use('/user', userRoutes)
app.use('/list', listRoutes)
app.use('/item', itemRoutes)
app.use('/participant', participantRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`))
