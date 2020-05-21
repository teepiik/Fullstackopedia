const gameRouter = require('express').Router()
const gameService = require('../services/gameService')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

/* NOTE: Possibility to sabotage other player if id known, get question and post wrong answer. Need to add
         User id check. Check this logic! */

// get right question for User id
// TODO Do not send correct answer!!
gameRouter.get('/getQuestion/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token missing or invalid.' })
        }

        const question = await gameService.handleNewQuestion(req.params.id)
        console.log(question)
        res.status(200).json(question)
    } catch (error) {
        next(error)
    }
})

// Handles client answers
gameRouter.post('/answer', async (req, res, next) => {
    const body = req.body
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token missing or invalid.' })
        }

        const isCorrect = await gameService.handleAnswerCheck(body.userId, body.questionId, body.answer)
        const outcome = { wasCorrect: isCorrect }

        // Handle answer and level progression
        const user = await User.findById(body.userId) // <-- CHECK THIS
        if(isCorrect) {
            // TODO JATKA TÄSTÄÄÄÄÄ!!!!
        // Right answer
            //const updatedUser = await
        } else {
        // Wrong answer
            //const updatedUser
        }
        // if anwer correct and lvl now 8 --> win
        res.status(200).json(outcome)
    } catch (error) {
        next(error)
    }
})

gameRouter.post('/newgame/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token missing or invalid.' })
        }

        const updatedUser = await gameService.handleNewGame(decodedToken.id)
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
})

module.exports = gameRouter