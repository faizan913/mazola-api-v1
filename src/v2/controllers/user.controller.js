const User = require('../models/user.model');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../../../config/auth.config");
exports.signup =  async (req, res) => {
    const hashPass = await bcrypt.hash(req.body.password, 8)
    const newUser =  new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
        role: req.body.role
    })
    console.log("user detail" +newUser)
    User.create(newUser, (err, user) =>{
        if (err){ res.send(err);}
       else{
        res.status(201).send({"success": true, message: "User registered successfully!", 'data': user });
       }
    })
}

exports.signin =  (req, res) => {
    const uname = req.body.username
    User.verifyUser(uname,(err, user) => {
        if (err) { res.send(err) }
        else {
            if(user.length>0){
                 var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user[0].password
                  );
                  if (!passwordIsValid) {
                     return res.status(422).send({
                      accessToken: null,
                      message: "Invalid Password!"
                    });
                  } 
                  var token = jwt.sign({ id: user[0].id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                  });
                  res.status(200).send({
                    id: user[0].id,
                    username: user[0].username,
                    email: user[0].email,
                    role: user[0].role,
                    accessToken: token
                  });

            }else{
                res.status(422).send({
                    message: "User Not found."
                  });
            }
          
        }
    })
}

