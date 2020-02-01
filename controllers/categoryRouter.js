const categoryRouter = require('express').Router()
const Category = require('../models/Category')

categoryRouter.get('/', async (req, res) => {
    const categories = await Category.find({})
    res.json(categories.map(category => category.toJSON()))
})

module.exports = categoryRouter