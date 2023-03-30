const Joi = require('joi')

const validateReg = (req, res, next) => {
    // Define a schema for your data
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        role: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })

    const { error, value } = schema.validate(req.body)
    if (error) {
        res.status(400).json({ error: error.details[0].message })
    } else {
        // If the input is valid, continue with the next middleware
        next()
    }
}

const validateLogin = (req, res, next) => {
    // Define a schema for your data
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string(),
    })
    const { error, value } = schema.validate(req.body)
    if (error) {
        res.status(400).json({ error: error.details[0].message })
    } else {
        // If the input is valid, continue with the next middleware
        next()
    }
}

module.exports = { validateReg, validateLogin }
