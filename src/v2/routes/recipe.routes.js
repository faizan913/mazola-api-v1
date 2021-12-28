

const express = require('express')
const recipeRouter = express.Router()
const recipeController = require('../controllers/recipe.controller');
const fileUpload = require('../helper/file-uploader')
recipeRouter.get('/recipes', recipeController.findAll)

recipeRouter.post('/recipes',fileUpload.single('images') ,recipeController.create)

recipeRouter.get('/recipes/:id', recipeController.findById)
/* 
router.put('/products/:id', recipeController.update)*/

//recipeRouter.delete('/recipes/:id', recipeController.delete) 

module.exports = recipeRouter