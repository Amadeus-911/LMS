// Import dependencies
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//internal imports
const userRouter = require('./routers/userRoutes')
const authRouter = require('./routers/authRoutes')
const librarianRouter = require('./routers/librarianRoutes')

// const db = require('./db')
// Load environment variables from .env file
dotenv.config()

// Initialize express app
const app = express()

// Initialize middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// Define routes and middleware
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/librarian', librarianRouter)
function errorHandler(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
}
app.use(errorHandler)
// ...

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
