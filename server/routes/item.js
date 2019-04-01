const express = require('express')
const router = express.Router()
const pool = require('../db')
const bodyParser = require('body-parser')
const baseUrl = `${process.env.BASE_URL}:${process.env.PORT}`

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get('', (req, res) => { // view data on all items
  pool.query('SELECT * FROM item', (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.json(result)
    }
  })
})

router.get('/:id', (req, res) => { // view item based on item_id
  const id = req.params.id
  pool.query('SELECT * FROM item where item_id = ' + id, (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.json(result[0])
    }
  })
})

router.post('', (req, res) => { // make a new item, parse list_id and item_name
  const listId = req.body.list_id
  const itemName = req.body.item_name

  if (listId !== parseInt(listId, 10)) {
    return res.send(new Error('List_id is not an integer'))
  }
  if (itemName.length === 0) {
    return res.send(new Error('Cannot create an item without a name.'))
  }
  const startingLetter = itemName.charAt(0)
  if (!/[a-z|A-Z|Æ|Ø|Å|æ|ø|å]/.test(startingLetter)) {
    return res.send(new Error('An item must start with a letter.'))
  }
  pool.query('INSERT INTO item SET list_id = "' + listId + '" , item_name = "' + itemName + '" , checked_by = NULL', (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.status(201).send(`Item added with ID: ${result.insertId}`)
    }
  })
})

router.delete('/:id', (req, res) => { // delete an item based on item_id
  const id = req.params.id
  pool.query('DELETE FROM item WHERE item_id =' + id, (error, result) => {
    if (error) {
      res.send(error.code)
    } else {
      res.send('Item deleted.')
    }
  })
})

router.put('/:id', (req, res) => { // update an item, setting the checked_by field
  const id = req.params.id
  let checkedBy = req.body.checked_by
  console.log(checkedBy)
  if (checkedBy == null) {
    checkedBy = 'NULL'
  } else if (validateEmail(checkedBy)) {
    checkedBy = `"${checkedBy}"`
  }
  else {
    return res.send(new Error('Invalid checked-by field.'))
  }

  pool.query(`UPDATE item SET checked_by = ${checkedBy} WHERE item_id = ${id}`, (error, result) => {
    if (error) {
      return res.send(error.code)
    } else {
      return res.send('Item updated successfully.')
    }
  })
})

function validateEmail (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

module.exports = router
