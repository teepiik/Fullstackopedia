const gameQuestionRouter = require('express').Router()
const GameQuestion = require('../models/GameQuestion')
const jwt = require('jsonwebtoken')

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

gameQuestionRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token missing or invalid.' })
        }

        const objForUpdate = {
            question: body.question,
            choices: body.choices,
            correctAnswer: body.correctAnswer
        }

        const updatedGameQuestion = await GameQuestion.findByIdAndUpdate(req.params.id, objForUpdate, { new:true })
        res.status(200).json(updatedGameQuestion.toJSON())
    } catch (error) {
        next(error)
    }
})

gameQuestionRouter.post('/', async (req, res, next) => {
    const body = req.body
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token missing or invalid.' })
        }

        const newGameQuestion = new GameQuestion({
            question: body.question,
            choices: body.choices,
            correctAnswer: body.correctAnswer
        })

        const savedGameQuestion = await newGameQuestion.save()
        res.status(201).json(savedGameQuestion.toJSON())
    } catch (error) {
        next(error)
    }
})

gameQuestionRouter.delete('/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token missing or invalid.' })
        }

        await GameQuestion.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = gameQuestionRouter