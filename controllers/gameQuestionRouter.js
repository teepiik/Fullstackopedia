const gameQuestionRouter = require('express').Router()
const GameQuestion = require('../models/GameQuestion')

gameQuestionRouter.get('/', async (req, res) => {
    const questions = await GameQuestion.find({})
    res.json(questions.map(question => question.toJSON()))
})

gameQuestionRouter.get('/:id', async (req, res, next) => {
    try {
        const question = await GameQuestion.findById(req.params.id)
        if (question) {
            res.json(question.toJSON())
        } else {
            res.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

// TODO add Post, Put, Del

module.exports = gameQuestionRouter