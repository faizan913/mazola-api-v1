const dbConn = require('../../../config/db.config')
var bcrypt = require("bcryptjs");
const User = function (user) {
    this.username = user.username
    this.email = user.email
    this.password = user.password
    this.role = user.role
    this.created_at = new Date()
    this.updated_at = new Date()
}
User.create =   (user, result)=> {
    
    const userData = {
        username:user.username,
        email :user.email,
        password: user.password,
        role : user.role,
        created_at: new Date(),
        updated_at: new Date()
    }

    dbConn.query("INSERT INTO users set ?", userData, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res.insertId)
        }
    })
}
User.findByUserName =  (username,email, result)=> {
    const query = `SELECT * from users where username= '${username}' OR email= '${email}' `
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
} 

User.verifyUser =  (username, result)=> {
    const query = `SELECT * from users where username= '${username}' `
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
} 
User.findByID =  (id, result)=> {
    const query = `SELECT * from users where id= '${id}' `
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
}

module.exports = User