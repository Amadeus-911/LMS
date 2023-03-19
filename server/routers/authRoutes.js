const express = require('express')
const router = express.Router()

//controller imports
const { createUser } = require('../controllers/authController')

//middleware
const { validateReg } = require('../middlewares/validators/regValidators')

router.post('/', validateReg, createUser)

module.exports = router
