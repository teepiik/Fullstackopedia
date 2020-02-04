const categoryRouter = require('express').Router()
const Category = require('../models/Category')

categoryRouter.get('/', async (req, res) => {
    const categories = await Category.find({})
    res.json(categories.map(category => category.toJSON()))
})

categoryRouter.get('/:id', async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category.toJSON())

    } catch (error) {
        next(error)
    }
})

categoryRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    try {
        const category = {
            categoryName: body.categoryName
        }
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category, { new:true })
        res.status(200).json(updatedCategory.toJSON())

    } catch (error) {
        next(error)
    }
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

categoryRouter.delete('/:id', async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.status(204).end()

    } catch (error) {
        next(error)
    }
})

module.exports = categoryRouter