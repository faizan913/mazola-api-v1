const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home.controller');
//const fileUpload = require('../helper/file-uploader')

router.get('/homes', homeController.findAll)


module.exports= router