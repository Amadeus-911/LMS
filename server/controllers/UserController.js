//imports
const db = require('../db')
const User = require('../models/User')
const Book = require('../models/Book')
const Borrow = require('../models/Borrow')

const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll()

        // sql = 'SELECT * FROM BOOKS'
        // const [rows] = await db.query(sql)

        res.json(books)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

const borrow = async (req, res) => {
    try {
        const borrow = {
            bookId: req.body.bookId,
            userId: req.body.userId,
            name: req.body.name,
            author: req.body.author,
            genre: req.body.genre,
            returnDate: req.body.returnDate,
        }
        const result = await Borrow.create(borrow)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

module.exports = { getBooks, borrow }
