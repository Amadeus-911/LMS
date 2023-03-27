const express = require('express')
const router = express.Router()
//imports
const { getBooks, borrow, getBorrowedBooks } = require('../controllers/UserController')

router.get('/books', getBooks)
router.get('/borrowed/:id', getBorrowedBooks)
router.post('/borrow', borrow)

module.exports = router
