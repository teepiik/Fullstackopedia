const gameRouter = require('express').Router()
const gameService = require('../services/gameService')
const jwt = require('jsonwebtoken')

// get right question for User id
gameRouter.get('/getQuestion/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token missing or invalid.' })
        }

        const question = gameService.handleNewQuestion(req.params.id)
        res.status(200).json(question.toJSON())
    } catch (error) {
        next(error)
    }
})

// get outcome for answer for User id
gameRouter.post('/answer', async (req, res, next) => {
    const body = req.body
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token missing or invalid.' })
        }

        const isCorrect = gameService.handleAnswerCheck(body.userId, body.questionId, body.answer)
        const outcome = { wasCorrect: isCorrect }
        res.status(200).json(outcome.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = gameRouter