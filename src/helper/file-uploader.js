const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    //destination: 'uploads/logo',
    destination: function(req, file, cb){
        cb(null ,'./uploads/products')
    },
    
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-mazola-${file.originalname}`)
      //cb(null,  file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
        return cb (new Error('Please upload correct image'))
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
        }, 
        fileFilter: fileFilter
    }) 

    module.exports = upload