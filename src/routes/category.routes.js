const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller');

// Retrieve all category
router.get('/categories', categoryController.findAll)

router.get('/categories/:id/products', categoryController.findAllProductByCatId)

// Create a new category
router.post('/categories', categoryController.create)

// Retrieve a single category with id
router.get('/categories/:id', categoryController.findById)

// Update a category with id
router.put('/categories/:id', categoryController.update)

// Delete a category
router.delete('/categories/:id', categoryController.delete)

module.exports = router