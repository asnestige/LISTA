const express = require('express')
const router = express.Router()
const pool = require('../db')
const bodyParser = require('body-parser')
const baseUrl = `${process.env.BASE_URL}:${process.env.PORT}`

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get('', (req, res) => { // view data on all users
  pool.query('SELECT * FROM user', (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.json(result)
    }
  })
})

router.get('/:email', (req, res) => { // view user based on user_email
  const email = req.params.email
  pool.query('SELECT * FROM user where user_email = "' + email + '"', (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.json({
        ...result[0],
        lists_url: baseUrl + '/user/' + email + '/lists'
      })
    }
  })
})

router.get('/:email/lists', (req, res) => { // view all lists that a user is participating in based on user_id
  const email = req.params.email
  pool.query('SELECT list_id,list_name, is_admin FROM user natural join participant natural join list where user_email = "' + email + '"', (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.json(result)
    }
  })
})

router.post('', (req, res) => { // make a new user, parse user_name and user_email
  const user_email = `"${req.body.user_email}"`
  if (!validateEmail(user_email)) {
    return res.send(new Error('Invalid checked-by field.'))
  }
  pool.query('INSERT INTO user SET ?', req.body, (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.status(201).send(`User added with e-mail: ${req.body.user_email}`)
    }
  })
})

router.post('/:email/lists', (req, res) => {
  const user_email = req.params.email
  if (!validateEmail(user_email)) {
    return res.send(new Error('Invalid checked-by field.'))
  }
  pool.query('INSERT INTO list SET ?', req.body, (error, result) => {
    if (error) {
      return res.send(error.code)
    }
    const list_id = result.insertId
    const participantData = {
      list_id: list_id,
      user_email: user_email,
      is_admin: 1
    }
    pool.query('INSERT INTO participant SET ?', participantData, (error, result) => {
      if (error) {
        return res.send(error.code)
      }
      res.status(201).send(`List added with ID: ${list_id}`)
    })
  })
})

function validateEmail (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

module.exports = router
