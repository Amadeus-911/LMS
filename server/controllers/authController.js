const bcyrpt = require('bcrypt')

const User = require('../models/User')

const createUser = async (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = { name: name, email: email, password: hash }

        //db save
        const userData = await User.create(user)
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Error' })
    }
}

module.exports = { createUser }
