const GameQuestion = require('../models/GameQuestion')
const User = require('../models/User')

// MEMO should these have try and catch?

const handleNewQuestion = async (userId) => {
    // for checking game level of user
    const user = await User.findById(userId)

    // return right question (one random of appropriate level)
    const questions = await GameQuestion.find({})
    const rightLevelQuestions = questions.filter(q => q.level === user.gameLevel )
    return rightLevelQuestions[Math.floor(Math.random() * rightLevelQuestions.length)]
}

const handleAnswerCheck = async (userId, questionId, answer) => {
    // for updating game level for user
    const user = await User.findById(userId)

    const question = await GameQuestion.findById(questionId)
    // check answer
    if(question.correctAnswer === answer) {
        user.level = user.level + 1
        // if level now 8 --> win
        await User.findByIdAndUpdate(user.id, user, { new:true })
        return true
    }
    // wrong answer
    user.level = 1
    await User.findByIdAndUpdate(user.id, user, { new:true })
    return false
}

const handleNewGame = async (userId) => {
    const user = await User.findById(userId)
    const newUser = { user, gameLevel: 1 }
    const updatedUser = await User.findByIdAndUpdate(user.id, newUser, { new:true })
    return updatedUser
}

module.exports = { handleNewQuestion, handleAnswerCheck, handleNewGame }