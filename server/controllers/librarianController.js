const Book = require('../models/Book')

const addBook = async (req, res) => {
    try {
        const book = {
            name: req.body.name,
            author: req.body.author,
            genre: req.body.genre,
            inStock: req.body.inStock,
        }
        const result = await Book.create(book)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal error' })
    }
}

const updateBook = async (req, res) => {
    try {
        const id = req.params.id
        const updatedBook = {
            name: req.body.name,
            author: req.body.author,
            genre: req.body.genre,
            inStock: req.body.inStock,
        }
        const book = await Book.findByPk(id)
        if (!book) {
            return res.status(404).json({ message: 'Book not found' })
        }
        const result = await book.update(updatedBook)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal error' })
    }
}

const deleteBook = async (req, res) => {
    try {
        const id = req.params.id
        const book = await Book.findByPk(id)
        if (!book) {
            return res.status(404).json({ message: 'Book not found' })
        }
        const result = book.destroy()
        res.status(200).json({ message: 'Deleted Successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal error' })
    }
}

module.exports = { addBook, updateBook, deleteBook }
