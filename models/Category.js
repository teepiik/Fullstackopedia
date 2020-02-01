const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
})

categorySchema.plugin(uniqueValidator)

categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Category', categorySchema)