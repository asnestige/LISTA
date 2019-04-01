const express = require('express')
const router = express.Router()
const pool = require('../db')
const bodyParser = require('body-parser')
const baseUrl = `${process.env.BASE_URL}:${process.env.PORT}`

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get('', (req, res) => { // view data on all lists
  pool.query('SELECT * FROM list', (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.json(result)
    }
  })
})

router.get('/:id', (req, res) => { // view list based on list_id
  const id = req.params.id
  pool.query('SELECT * FROM list where list_id = ' + id, (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.json({
        ...result[0],
        users_url: baseUrl + '/list/' + id + '/users',
        items_url: baseUrl + '/list/' + id + '/items'
      })
    }
  })
})

router.get('/:id/items', (req, res) => { // view all items in a list based on list_id
  const id = req.params.id
  pool.query('SELECT item_id, item_name, checked_by FROM list natural join item where list_id = ' + id, (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.json(result)
    }
  })
})

router.get('/:id/users', (req, res) => { // view all participants in a list based on list_id
  const id = req.params.id
  pool.query('SELECT user_name, is_admin, user_email FROM list natural join participant natural join user where list_id = ' + id, (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.json(result)
    }
  })
})

router.post('/:id/items', (req, res) => { // view all items in a list based on list_id
  const list_id = req.params.id
  const { item_name } = req.body
  const itemData = {
    list_id: list_id,
    item_name: item_name,
    checked_by: null
  }
  pool.query('INSERT INTO item SET ?', itemData, (error, result) => {
    if (error) {
      res.send(error.code)
    }
    res.status(201).send(`List added with ID: ${result.insertId}`)
  })
})

router.post('', (req, res) => { // make a new list, parse list_name
  const list_name = req.body.list_name
  if (list_name.length === 0) {
    return res.send(new Error('Cannot create a list without a name.'))
  }
  const startingLetter = list_name.charAt(0)
  if (!/[a-z|A-Z|Æ|Ø|Å|æ|ø|å]/.test(startingLetter)) {
    return res.send(new Error('A list must start with a letter.'))
  }

  pool.query('INSERT INTO list SET list_name = "' + req.body.list_name + '"', (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.status(201).send(`List added with ID: ${result.insertId}`)
    }
  })
})

router.delete('/:id', (req, res) => { // delete a list based on list_id
  const id = req.params.id

  pool.query('DELETE FROM list WHERE list_id =' + id, (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.send('List deleted.')
    }
  })
})

router.delete('/:id/user/:email', (req, res) => { // delete a user based on list_id and user_email
  const id = req.params.id
  const email = req.params.email

  pool.query('DELETE FROM participant WHERE list_id = "' + id + '" and user_email = "' + email + '"', (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.send('Participant deleted.')
    }
  })
})

module.exports = router
