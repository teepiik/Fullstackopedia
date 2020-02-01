const questionRouter = require('express').Router()
const Question = require('../models/Question')
const Category = require('../models/Category')

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
    } catch (error) {
        next(error)
    }
})

questionRouter.post('/', async (req, res, next) => {
    const body = req.body
    try {
        const category = await Category.findOne({ categoryName: body.category })

        const questionObject = new Question({
            question: body.question,
            answer: body.answer,
            category: category.categoryName
        })

        const savedQuestion = await questionObject.save()
        category.questions = category.questions.concat(savedQuestion._id)
        await category.save()
        res.status(201).json(savedQuestion.toJSON())

    } catch(error) {
        next(error)
    }
})



module.exports = questionRouter