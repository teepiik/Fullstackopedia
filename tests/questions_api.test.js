const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Question = require('../models/Question')
const Category = require('../models/Category')

const questions = [
    {
        question: 'What is love?',
        answer: 'Babe dont hurt me',
        categoryName: 'Networking'
    },
    {
        question: 'Who is the Captain?',
        answer: 'Harry Kane',
        categoryName: 'Programming'
    }
]

const categories = [
    { categoryName: 'Programming' },
    { categoryName: 'Networking' },

]

beforeAll(async () => {
    await Category.deleteMany()

    let categoryObject = new Category(categories[0])
    await categoryObject.save()

    categoryObject = new Category(categories[1])
    await categoryObject.save()
})

beforeEach(async () => {
    await Question.deleteMany({})

    let questionObject = new Question(questions[0])
    await questionObject.save()

    questionObject = new Question(questions[1])
    await questionObject.save()
})

test('Questions returned as JSON.', async () => {
    await api
        .get('/api/questions')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})