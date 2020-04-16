const mongoose = require('mongoose')

const GameQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    choiceA: {
        type: String,
        require: true,
        maxlength: 20
    },
    choiceB: {
        type: String,
        require: true,
        maxlength: 20
    },
    choiceC: {
        type: String,
        require: true,
        maxlength: 20
    },
    choiceD: {
        type: String,
        require: true,
        maxlength: 20
    },
    correctAnswer: {
        type: String,
        required: true,
        // validate: add regex a-d
    },
    level: {
        type: Number,
        required: true,
        // validate: add regex 1-8
    }
})

GameQuestionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('GameQuestion', GameQuestionSchema)