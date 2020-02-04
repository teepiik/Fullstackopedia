const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/User')
//const jwt = require('jsonwebtoken')
/*
const getToken = req => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}*/

// Base url is set to /api/users
userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users.map(u => u.toJSON()))
})

userRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(body.password, salt)

        const user = new User({
            username: body.username,
            passwordHash
        })

        const savedUser = await user.save()
        res.json(savedUser)

    } catch (exception) {
        next(exception)
    }
})

module.exports = userRouter