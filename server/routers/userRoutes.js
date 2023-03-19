const express = require('express')
const router = express.Router()
//imports
const { getBooks } = require('../controllers/UserController')

router.get('/books', getBooks)

module.exports = router
