const express = require('express')
const router = express.Router()
const videoController = require('../controllers/video.controller');
const fileUpload = require('../helper/file-uploader')

router.get('/videos', videoController.findAll)

router.post('/videos',fileUpload.single('thumbnail') ,videoController.create)

router.get('/videos/:id', videoController.findById)
/* 
router.put('/videos/:id', cproductController.update)

router.delete('/videos/:id', videoController.delete)  */

module.exports = router