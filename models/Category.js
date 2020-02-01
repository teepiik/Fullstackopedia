const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
})

categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Category', categorySchema)