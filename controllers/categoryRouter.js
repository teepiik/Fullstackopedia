const categoryRouter = require('express').Router()
const Category = require('../models/Category')

categoryRouter.get('/', async (req, res) => {
    const categories = await Category.find({})
    res.json(categories.map(category => category.toJSON()))
})

categoryRouter.post('/', async (req, res, next) => {
    const body = req.body
    try {
        const categoryObject = new Category({
            categoryName: body.categoryName
        })
        const savedCategory = await categoryObject.save()
        res.status(201).json(savedCategory.toJSON())

    } catch(error) {
        next(error)
    }
})

module.exports = categoryRouter