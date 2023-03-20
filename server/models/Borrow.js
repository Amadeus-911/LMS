const { Sequelize, DataTypes } = require('sequelize')

// Create a Sequelize instance
const sequelize = new Sequelize('library', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

// Define the database model
const Borrow = sequelize.define('Borrow', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    returnDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
    console.log('Borrow model synchronized with MySQL database successfully')
})()

// Export the database model
module.exports = Borrow
