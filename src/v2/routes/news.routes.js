const express = require('express')
const router = express.Router()
const newsController = require('../controllers/news.controller');
const fileUpload = require('../helper/file-uploader')
router.get('/news', newsController.findAll)

//router.post('/products',fileUpload.single('images') ,newsController.create)

router.get('/news/:id', newsController.findById)
/* 
router.put('/products/:id', newsController.update)*/

router.delete('/products/:id', newsController.delete) 

module.exports = router