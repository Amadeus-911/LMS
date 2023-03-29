const express = require('express')
const router = express.Router()
//imports
const {
    getBooks,
    borrow,
    getBorrowedBooks,
    getDueBooks,
    returnBook,
    getBooksTest,
    getNumberOfBooks,
    loadMore,
    getBook,
    searchBooks,
} = require('../controllers/UserController')

router.get('/books', getBooks)
router.get('/book/:id', getBook)
router.get('/totalnum', getNumberOfBooks)
router.get('/load', loadMore)
router.get('/search', searchBooks)
router.get('/borrowed/:id', getBorrowedBooks)
router.get('/due/:id', getDueBooks)
router.post('/borrow', borrow)
router.post('/return/:id', returnBook)
router.get('/book', getBooksTest)
module.exports = router
