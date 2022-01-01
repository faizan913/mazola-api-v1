const { authJwt } = require("../middleware");
const configController = require('../controllers/config.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header({
        "Access-Control-Allow-Headers":"x-access-token, Origin, Content-Type, Accept"
      }
        
      );
      next();
    });
  
  
    app.get(
      "/api/v2/config",
      configController.findAll
    );
    app.get(
      "/api/v2/config/:id",
      configController.findById
    );
    app.post( "/api/v2/config",
    [authJwt.verifyToken,authJwt.isAdmin],
    configController.create
    )
    app.put( "/api/v2/config/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    configController.update)

    app.delete( "/api/v2/config/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    configController.deleteByID
    )
  }
