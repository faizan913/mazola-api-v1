
const { authJwt } = require("../middleware");
const newsController = require('../controllers/news.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header({
        "Access-Control-Allow-Headers":"x-access-token, Origin, Content-Type, Accept"
      });
      next();
    });
  
  
    app.get(
      "/api/v2/news",
      newsController.findAll
    );
    app.get(
      "/api/v2/news/:id",
      newsController.findById
    );
     app.post( "/api/v2/news",
    [authJwt.verifyToken,authJwt.isAdmin],
    newsController.create
    )
    app.put( "/api/v2/news/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    newsController.update)

    app.delete( "/api/v2/news/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    newsController.deleteByID
    ) 
    
   
  }



