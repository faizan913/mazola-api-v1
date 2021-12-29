const { authJwt } = require("../middleware");
const categoryController = require('../controllers/category.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header({
        "Access-Control-Allow-Headers":"x-access-token, Origin, Content-Type, Accept"
      }
        
      );
      next();
    });
  
  
    app.get(
      "/api/v2/categories",
      categoryController.findAll
    );
    app.get(
      "/api/v2/categories/:id",
      categoryController.findById
    );
    app.post( "/api/v2/categories",
    [authJwt.verifyToken,authJwt.isAdmin],
    categoryController.create
    )
    app.put( "/api/v2/categories/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    categoryController.update)

    app.delete( "/api/v2/categories/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    categoryController.deleteByID
    )
    
   
  }


// Delete a category
//router.delete('/categories/:id', categoryController.delete)

