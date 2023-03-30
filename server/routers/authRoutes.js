const express = require('express')
const router = express.Router()

//controller imports
const { createUser, login, logout } = require('../controllers/authController')

//middleware
const { validateReg, validateLogin } = require('../middlewares/validators/regValidators')

router.post('/', validateReg, createUser)
router.post('/login', validateLogin, login)
router.post('/logout', logout)

module.exports = router
