const axios = require('axios')
const humps = require('humps')

class Lista {
  constructor ({ baseURL, encoding, interval }) {
    if (!baseURL) {
      throw new Error('baseURL is required')
    }
    this.baseURL = baseURL
    this.encoding = encoding || 'utf-8'
    this.interval = interval || 2000
    this.headers = {
      'User-Agent': 'Lista API Client Node.js',
      'Accept': 'application/json'
    }
  }

  request (method, url, data) {
    const { baseURL, encoding, timeout, headers } = this
    return axios({
      method,
      url,
      baseURL,
      data,
      timeout,
      encoding,
      headers
    }).then(res => Promise.resolve(res.data))
      .catch(err => Promise.reject(err.code))
  }

  // The polling function
  poll (fn, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000)
    interval = interval || 100

    var checkCondition = function (resolve, reject) {
      var ajax = fn

      // dive into the ajax promise
      ajax.then(function (response) {
        // If the condition is met, we're done!
        if (response) {
          resolve(response)
        } else if (Number(new Date()) < endTime) {
          setTimeout(checkCondition, interval, resolve, reject)
        } else {
          reject(new Error('timed out for ' + fn + ': ' + arguments))
        }
      })
    }

    return new Promise(checkCondition)
  }

  // implementing continuous polling

  continuosPolling (fn, cb, interval, timeout) {
    interval = interval || this.interval
    let timerId = setInterval(() => this.poll(fn, timeout, 150)
      .then(function (res) {
        cb(res, null)
        // Polling done, now do something else!
      }).catch(function (err) {
        cb(null, err)

      // Polling timed out, handle the error!
      }), interval)
    if (timeout) {
      setTimeout(() => { clearInterval(timerId) }, timeout)
    }
  }

  // User

  createUser ({ userEmail, userName }) {
    const data = humps.decamelizeKeys({ userEmail, userName })
    return this.request('post', 'user', data)
  }

  getUser ({ userEmail }) {
    return this.request('get', `user/${userEmail}`)
  }
  pollUser ({ userEmail, interval, timeout }, cb) {
    const actualInterval = interval || this.interval
    return this.continuosPolling(this.request('get', `user/${userEmail}`), cb, actualInterval, timeout)
  }

  getUserLists ({ userEmail }) {
    return this.request('get', `user/${userEmail}/lists`)
  }

  pollUserLists ({ userEmail, interval, timeout }, cb) {
    const actualInterval = interval || this.interval
    return this.continuosPolling(this.request('get', `user/${userEmail}/lists`), cb, actualInterval, timeout)
  }

  // List

  createList ({ listName }) {
    const data = humps.decamelizeKeys({ listName })
    return this.request('post', 'list', data)
  }

  createUserList ({ userEmail, listName }) {
    const data = humps.decamelizeKeys({ listName })
    return this.request('post', `user/${userEmail}/lists`, data)
  }

  getList ({ listId }) {
    return this.request('get', `list/${listId}`)
  }

  pollList ({ listId, interval, timeout }, cb) {
    const actualInterval = interval || this.interval
    return this.continuosPolling(this.request('get', `list/${listId}`), cb, actualInterval, timeout)
  }

  deleteList ({ listId }) {
    return this.request('delete', `list/${listId}`)
  }

  addListUser ({ userEmail, listId }) {
    const data = humps.decamelizeKeys({ userEmail, listId })
    return this.request('post', `participant`, data)
  }

  removeListUser ({ userEmail, listId }) {
    return this.request('delete', `list/${listId}/user/${userEmail}`)
  }

  // Item

  createItem ({ itemName }) {
    const data = humps.decamelizeKeys({ itemName })
    return this.request('get', 'item', data)
  }

  createListItem ({ listId, itemName }) {
    const data = humps.decamelizeKeys({ itemName })
    return this.request('post', `list/${listId}/items`, data)
  }

  getItem ({ itemId }) {
    return this.request('get', `item/${itemId}`)
  }

  pollItem ({ itemId, interval, timeout }, cb) {
    const actualInterval = interval || this.interval
    return this.continuosPolling(this.request('get', `item/${itemId}`), cb, actualInterval, timeout)
  }

  getListItems ({ listId }) {
    return this.request('get', `list/${listId}/items`)
  }

  pollListItems ({ listId, interval, timeout }, cb) {
    const actualInterval = interval || this.interval
    return this.continuosPolling(this.request('get', `list/${listId}/items`), cb, actualInterval, timeout)
  }

  getListUsers ({ listId }) {
    return this.request('get', `list/${listId}/users`)
  }

  pollListUsers ({ listId, interval, timeout }, cb) {
    const actualInterval = interval || this.interval
    return this.continuosPolling(this.request('get', `list/${listId}/users`), cb, actualInterval, timeout)
  }

  checkItem ({ itemId, checkedBy }) {
    const data = humps.decamelizeKeys({ checkedBy })
    return this.request('put', `item/${itemId}`, data)
  }

  uncheckItem({ itemId }) {
    const data = humps.decamelizeKeys({ checkedBy: null })
    return this.request('put', `item/${itemId}`, data)
  }

  deleteItem ({ itemId }) {
    return this.request('delete', `item/${itemId}`)
  }
}

module.exports = Lista
