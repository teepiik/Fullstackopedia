const questionRouter = require('express').Router()
const Question = require('../models/Question')

questionRouter.get('/', async (req, res) => {
    const questions = await Question.find({})
    res.json(questions.map(question => question.toJSON()))
})

questionRouter.get('/:id', async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id)
        if (question) {
            res.json(question.toJSON())
        } else {
            res.status(404).end()
        }
    } catch (e) {
        next(e)
    }
})



module.exports = questionRouter