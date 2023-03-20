const express = require('express')
const router = express.Router()
//imports
const { getBooks, borrow } = require('../controllers/UserController')

router.get('/books', getBooks)
router.post('/borrow', borrow)

module.exports = router
