//imports
const db = require('../db')
const User = require('../models/User')

const getBooks = async (req, res) => {
    try {
        sql = 'SELECT * FROM BOOKS'
        const [rows] = await db.query(sql)
        res.json(rows)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

module.exports = { getBooks }
