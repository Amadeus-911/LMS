const express = require('express')
const router = express.Router()

const { addBook, updateBook, deleteBook } = require('../controllers/librarianController')

router.post('/add', addBook)
router.put('/update/:id', updateBook)
router.delete('/delete/:id', deleteBook)

module.exports = router
