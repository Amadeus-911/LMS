const mysql = require('mysql2/promise')
const { Sequelize } = require('sequelize')

//init database

// try {
//     const pool = mysql.createPool({
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'Library',
//         waitForConnections: true,
//         connectionLimit: 10,
//         queueLimit: 0,
//     })
// } catch (error) {
//     console.error('Error connecting to MySQL database:', error)
// }

function connectToDatabase(err, req, res, next) {
    try {
        const sequelize = new Sequelize('library', 'root', '', {
            host: 'localhost',
            dialect: 'mysql',
        })
        // Return the Sequelize object
        return sequelize
    } catch (error) {
        console.error('An error occurred while connecting to the MySQL database:', error)
        next(err)
    }
}

module.exports = connectToDatabase

// module.exports = pool
