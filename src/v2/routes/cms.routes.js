
//const fileUpload = require('../helper/file-uploader')

const { authJwt } = require("../middleware");
const cmsController = require('../controllers/cms.controller');

//router.post('/cms',fileUpload.single('thumbnail') ,cmsController.create)

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header({
        "Access-Control-Allow-Headers":"x-access-token, Origin, Content-Type, Accept"
      }
        
      );
      next();
    });
  
  
    app.get(
      "/api/v2/cms",
      cmsController.findAll
    );
    app.get(
      "/api/v2/cms/:id",
      cmsController.findById
    );
    app.post( "/api/v2/cms",
    [authJwt.verifyToken,authJwt.isAdmin],
    cmsController.create
    )
    app.put( "/api/v2/cms/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    cmsController.update)

    app.delete( "/api/v2/cms/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    cmsController.deleteByID
    ) 
    
   
  }



