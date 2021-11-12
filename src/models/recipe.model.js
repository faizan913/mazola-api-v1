const dbConn = require('../../config/db.config');


const Recipe = function (recipe) {
    this.type = recipe.type
    this.thumbnail = recipe.thumbnail
    this.views = recipe.views
    this.active = recipe.active
    this.archived = recipe.archived
    this.refrence_type = recipe.refrence_type
    this.translation_type = recipe.translation_type
    this.locale = recipe.locale
    this.value = recipe.value
    this.refrence_type = recipe.refrence_type
    this.created_at = new Date()
    this.updated_at = new Date()
}
Recipe.create = function (recipe, result) {
    //console.log(product)
    const videoData = {
        type:recipe.type,
        views :recipe.views,
        thumbnail: recipe.filename,
        active : recipe.active,
        archived : recipe.archived,
        created_at: new Date(),
        updated_at: new Date()
    }

    dbConn.query("INSERT INTO videos set ?", videoData, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            //result(null, res.insertId)
            const translationData = {
                translation_type: recipe.translation_type,
                refrence_type: recipe.refrence_type,
                locale: recipe.locale,
                value: recipe.value,
                reference_id: res.insertId,
                created_at: new Date(),
                updated_at: new Date()
            }
            dbConn.query("INSERT INTO translations set ?", translationData, function (err, res) {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, res.insertId)
                }
            })
        }
    })
}


Recipe.findById =  (lang,id, result)=> {
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
}

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

module.exports = Recipe