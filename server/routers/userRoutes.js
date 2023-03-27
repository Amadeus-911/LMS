const express = require('express')
const router = express.Router()
//imports
const { getBooks, borrow, getBorrowedBooks, returnBook } = require('../controllers/UserController')

router.get('/books', getBooks)
router.get('/borrowed/:id', getBorrowedBooks)
router.post('/borrow', borrow)
router.post('/return/:id', returnBook)
module.exports = router
