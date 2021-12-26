const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const User = require('../models/user.model');

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized user!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByID(req.userId,(err, user) => {
    if (err) { res.send(err) }
    else {
        if (user[0].role === 'admin') {
          next()
          return;
        }
        res.status(403).send({
          message: "You don't have permission to access !"
        });
       
    } 
})
};

isUser = (req, res, next) => {
  User.findByID(req.userId,(err, user) => {
    if (err) { res.send(err) }
    else {
      console.log(user[0].role)
        if (user[0].role === 'user') {
          next()
          return;
        }
        res.status(403).send({
          message: "You don't have permission to access !"
        });
       
    } 
})
};


const authJwt = {
  verifyToken,
  isAdmin,
  isUser
};
module.exports = authJwt;
