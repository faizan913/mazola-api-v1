//const dbConn = require('../../config/db.config');
const dbConn = require('../../config/db.config')
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
    console.log(query)
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
    console.log(query)
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
}
/* Recipe.findById =  (lang,id, result)=> {
    const query = 'SELECT r.id,(select t.value from translations t where t.reference_id = r.id AND t.reference_type = "recipes" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = r.id AND t.reference_type = "recipes" and t.translation_type = "description" and t.locale = '+lang+')as "description", (select t.value from translations t where t.reference_id = r.id AND t.reference_type = "recipes" and t.translation_type = "content" and t.locale = '+lang+')as "content",r.images,r.type,r.prep_time,r.total_time,r.servings,r.calories,r.views FROM recipes r where r.id='+id
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
}    
Recipe.findAll = (lang,result) => {
    const query = 'SELECT r.id,(select t.value from translations t where t.reference_id = r.id AND t.reference_type = "recipes" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = r.id AND t.reference_type = "recipes" and t.translation_type = "description" and t.locale = '+lang+')as "description", (select t.value from translations t where t.reference_id = r.id AND t.reference_type = "recipes" and t.translation_type = "content" and t.locale = '+lang+')as "content",r.images,r.type,r.prep_time,r.total_time,r.servings,r.calories,r.views FROM recipes r'
    dbConn.query(query, (err, res) => {
        if (err) {
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
} */

/* Recipe.update = (id, products, result) => {
    console.log(category)
  dbConn.query("UPDATE categories SET active=?,parent_id=? WHERE id = ?", [category.active,category.parent_id, id],  (err, res) =>{
        if(err) {
            result(null, err)
        }else{  
            console.log('else') 
            dbConn.query("UPDATE translations SET translation_type=?,refrence_type=? ,locale=? ,value=? WHERE reference_id = ?", 
            [category.translation_type,category.refrence_type,category.locale,category.value, id],  (err, res) =>{
                if(err) {
                    result(null, err)
                }else{   
                    console.log('right') 
                    result(null, res);
                }
            })
        }
    }); 
};
Recipe.delete = (id, result)=>{
     dbConn.query("DELETE products, translations FROM products INNER JOIN translations ON products.id = translations.reference_id WHERE products.id= ?", [id],  (err, res)=> {
        if(err) {
            result(null, err);
        }
        else{
            //console.log(res.affectedRows)
            result(null, res);
        }
    })
}  */

module.exports = User