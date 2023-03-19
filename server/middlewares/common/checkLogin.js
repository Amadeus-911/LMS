const jwt = require('jsonwebtoken')

function checkLogin(req, res, next) {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' })
            } else {
                req.userEmail = decodedToken.userEmail
                next()
            }
        })
    } else {
        res.status(401).json({ message: 'Missing Authorization header' })
    }
}

module.exports = { checkLogin }
