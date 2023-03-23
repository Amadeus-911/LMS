const { Sequelize, DataTypes } = require('sequelize')
const connectToDatabase = require('../db')

// Create a Sequelize instance
const sequelize = connectToDatabase()

// Define the database model
const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inStock: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
})

// Synchronize the database model with the MySQL database
;(async () => {
    await sequelize.sync({ force: false })
    console.log('Book model synchronized with MySQL database successfully')
})()

// Export the database model
module.exports = Book
