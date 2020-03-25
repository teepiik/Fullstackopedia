const gameRouter = require('express').Router()
const GameQuestion = require('../models/GameQuestion')
const User = require('../models/User')

// get right question for User id
gameRouter.get('/:id')

// handle answer for User id
gameRouter.post('/:id')


module.exports = gameRouter