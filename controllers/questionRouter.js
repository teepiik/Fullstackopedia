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
        console.log(body)
        const category = await Category.findOne({ categoryName: body.category })

        const questionObject = new Question({
            question: body.question,
            answer: body.answer,
            category: category
        })

        const savedQuestion = await questionObject.save()
        category.question =category.questions.concat(savedQuestion._id)
        await category.save()
        res.json(savedQuestion.toJSON())

    } catch(error) {
        next(error)
    }
})



module.exports = questionRouter