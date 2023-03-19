const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({
            where: { email },
        })

        bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
                console.error(error)
            } else if (isMatch) {
                //generate token and send it
                const payload = { email: email }
                const secret = process.env.JWT_SECRET
                const token = jwt.sign(payload, secret, { expiresIn: process.env.TOKEN_EXPIRY })
                res.status(200).json({ token })
            } else {
                res.status(401).json({ message: 'Invalid Email or Password' })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Error' })
    }
}

module.exports = { createUser, login }
