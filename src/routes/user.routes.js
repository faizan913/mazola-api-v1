const { verifySignUp } = require("../middleware/");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header({
      "Access-Control-Allow-Headers":"x-access-token, Origin, Content-Type, Accept",
      "Content-Range":"items 0-24/900"
    }
    );
    next();
  });

  app.post(
    "/api/v1/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup
  );

  app.post("/api/v1/signin", controller.signin);
};
