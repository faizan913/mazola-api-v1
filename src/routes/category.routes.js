const { authJwt } = require("../middleware");
const categoryController = require('../controllers/category.controller');

// Retrieve all category
//router.get('/categories', [authJwt.verifyToken,authJwt.isAdmin], categoryController.findAll)
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
  
    app.get(
      "/api/v1/categories",
      [authJwt.verifyToken],
      categoryController.findAll
    );
    app.get(
      "/api/v1/categories/:id",
      [authJwt.verifyToken],
      categoryController.findById
    );
    
    app.delete( "/api/v1/categories/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    categoryController.deleteByID
    )
    
   
  }


// Delete a category
//router.delete('/categories/:id', categoryController.delete)

