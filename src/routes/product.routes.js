const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller');
const fileUpload = require('../helper/file-uploader')
router.get('/products', productController.findAll)

router.post('/products',fileUpload.single('images') ,productController.create)

router.get('/products/:id', productController.findById)
/* 
router.put('/products/:id', cproductController.update)*/

router.delete('/products/:id', productController.delete) 

module.exports = router