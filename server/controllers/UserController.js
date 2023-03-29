//imports
const { Op } = require('sequelize')
const queryString = require('querystring')
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

const getBorrowedBooks = async (req, res) => {
    try {
        const books = await Borrow.findAll({ where: { userId: req.params.id } })
        res.json(books)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const getDueBooks = async (req, res) => {
    try {
        const books = await Borrow.findAll({ where: { userId: req.params.id, isReturned: false } })
        res.json(books)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const borrow = async (req, res) => {
    try {
        const updateStock = async () => {
            const book = await Book.findByPk(req.body.bookId)
            await book.update({ inStock: book.inStock - 1 })
        }

        const borrow = {
            bookId: req.body.bookId,
            userId: req.body.userId,
            name: req.body.name,
            author: req.body.author,
            genre: req.body.genre,
            returnDate: req.body.returnDate,
        }
        const result = await Borrow.create(borrow)
        updateStock()

        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

const returnBook = async (req, res) => {
    try {
        //find book id
        const id = req.params.id
        const bookId = req.body.bookId

        const book = await Book.findByPk(bookId)
        await book.update({ inStock: book.inStock + 1 })

        //update borrowed table isReturned
        const borrowed = await Borrow.findByPk(id)
        await borrowed.update({ isReturned: true })
        res.status(200).json({ message: 'OK' })
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

const getBooksTest = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const offset = (page - 1) * limit

    const books = await Book.findAll({
        limit,
        offset,
    })

    const totalBooks = await Book.count({})

    const totalPages = Math.ceil(totalBooks / limit)

    res.json({
        books: books,
        currentPage: page,
        totalPages,
        totalItems: totalBooks,
    })
}

const loadMore = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    try {
        const books = await Book.findAll({
            offset,
            limit,
        })
        res.json(books)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal server error')
    }
}

const searchBooks = async (req, res) => {
    try {
        const search = async (searchTerm) => {
            try {
                const filteredBooks = await Book.findAll({
                    where: {
                        [Op.or]: [
                            { name: { [Op.like]: `%${searchTerm.toLowerCase()}%` } },
                            { author: { [Op.like]: `%${searchTerm.toLowerCase()}%` } },
                            { genre: { [Op.like]: `%${searchTerm.toLowerCase()}%` } },
                        ],
                    },
                })
                return filteredBooks
            } catch (error) {
                console.error(error)
            }
        }
        const queryObject = queryString.parse(req.url.split('?')[1])
        const term = queryObject.search // "term"
        const filteredBooks = await search(term)
        res.json(filteredBooks)
    } catch (error) {
        console.log(error)
    }
}

const getNumberOfBooks = async (req, res) => {
    const totalBooks = await Book.count({})
    res.json({ totalBooks })
}

module.exports = { getBooks, borrow, getBorrowedBooks, getDueBooks, returnBook, getBooksTest, getNumberOfBooks, loadMore, searchBooks }
