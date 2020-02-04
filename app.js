const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const questionRouter = require('./controllers/questionRouter')
const categoryRouter = require('./controllers/categoryRouter')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(console.log('Database connection to MONGODB.'))
    .catch((error) => {
        console.log('Error connecting to MONGODB: ', error.message)
    })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use('/api/questions', questionRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app