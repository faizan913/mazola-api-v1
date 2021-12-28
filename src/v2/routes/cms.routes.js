const express = require('express')
const router = express.Router()
const cmsController = require('../controllers/cms.controller');
const fileUpload = require('../helper/file-uploader')

router.get('/cms', cmsController.findAll)

router.post('/cms',fileUpload.single('thumbnail') ,cmsController.create)

 router.get('/cms/:id', cmsController.findById)
/* 
router.put('/cms/:id', cmsController.update)

router.delete('/cms/:id', cmsController.delete)  */

module.exports = router