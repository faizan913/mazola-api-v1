const User = require('../models/user.model');
//const ROLES = db.role;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
    var username = (req.body.username)
    var email = (req.body.email)
    User.findByUserName(username, email,(err, user) => {
        if (err) { res.send(err) }
        else {
          //console.log(user.length)
            if (user.length>0) {
              res.status(400).send({
                message: "Failed! Username/Email is already in use!"
              });
              return;
            } 
            next();
        } 
    })

  //
  
};

checkRolesExisted = async (req, res, next) => {
      try{
        const role = await User.findOne({where: {name: req.body.roles}})
        if(!role){
          res.status(400).send({
            message: "Failed! Role does't exist in system!"
          });
          return;
        }
        next()
      }catch(e){
        res.status(500).send(e)
      }
  
 
   
  
 
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
