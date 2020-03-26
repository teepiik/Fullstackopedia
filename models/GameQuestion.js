const mongoose = require('mongoose')

const GameQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    // Choices should have one of each, A, B, C or D
    choises: {
        charOfChoice: {
            type: String,
            required: true,
            // validate: add regex a-d
        },
        textOfChoice: {
            type: String,
            require: true,
            maxlength: 30
        }
    },
    correctAnswer: {
        type: String,
        required: true,
        // validate: add regex a-d
    },
    level: {
        type: Number,
        required: true,
        // validate: add regex 1-10
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