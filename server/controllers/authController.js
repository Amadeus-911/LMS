const bcyrpt = require('bcrypt')

const User = require('../models/User')

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Error' })
    }
}

module.exports = { createUser }
