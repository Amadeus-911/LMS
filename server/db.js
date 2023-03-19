const mysql = require('mysql2/promise')
//init database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Library',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

module.exports = pool
