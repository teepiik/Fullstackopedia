const gameRouter = require('express').Router()


/*
questionRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token missing or invalid.' })
        }
        const question = {
            question: body.question,
            answer: body.answer,
            category: category.categoryName
        }
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, question, { new:true })
        res.status(200).json(updatedQuestion.toJSON())

    } catch(error) {
        next(error)
    }
}) */

// get right question for User id
gameRouter.get('/:id', async (req, res, next) => {
    const body = req.body
    try {
        // HAJAUTA SERVISEKSI
        console.log('hah')
    } catch (error) {
        next(error)
    }
})
// check user gamelevel
// response question (not answer)

// handle answer for User id
gameRouter.post('/:id')
// have question id in body
// check answer, update player level
// response outcome (maybe next question also?)


module.exports = gameRouter