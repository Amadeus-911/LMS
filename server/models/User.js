const { Sequelize, DataTypes } = require('sequelize')
const connectToDatabase = require('../db')

// Create a Sequelize instance
const sequelize = connectToDatabase()
// Define the database model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'student',
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
    console.log('User model synchronized with MySQL database successfully')
})()

// Export the database model
module.exports = User
