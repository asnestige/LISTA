const express = require('express')
const router = express.Router()
const pool = require('../db')
const bodyParser = require('body-parser')
const baseUrl = `${process.env.BASE_URL}:${process.env.PORT}`

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get('', (req, res) => { // view data on all items
  pool.query('SELECT * FROM participant', (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.json(result)
    }
  })
})

router.post('', (req, res) => {
  const listId = req.body.list_id
  const userEmail = req.body.user_email
  
  pool.query('INSERT INTO participant SET list_id = "' + listId + '", user_email = "' + userEmail + '", is_admin = NULL', (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.send('Participant added.')
    }
  })
})

module.exports = router
