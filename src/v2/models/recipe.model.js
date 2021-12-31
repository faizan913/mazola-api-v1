const dbConn = require('../../../config/db.config');


const Recipe = function (recipe) {
    this.title=recipe.title,
    this.description=recipe.description,
    this.content=recipe.content,
    this.type =recipe.type,
    this.prep_time =recipe.prep_time,
    this.servings=recipe.servings,
    this.total_time=recipe.total_time,
    this.images=recipe.images,
    this.calories=recipe.calories,
    this.views=recipe.views,
    this.active=recipe.active,
    this.archived =recipe.archived,
    this.created_at= new Date(),
    this.updated_at= new Date()
}
Recipe.create = function (recipe, result) {
    let imageJson = JSON.stringify(recipe.images)
    const recipeData = {
            type :recipe.type,
            prep_time :recipe.prep_time,
            servings:recipe.servings,
            total_time:recipe.total_time,
            images:imageJson,
            calories:recipe.calories,
            views:recipe.views,
            active:recipe.active,
            archived :recipe.archived,
            created_at:new Date(),
            updated_at: new Date()
    }

    dbConn.query("INSERT INTO recipes set ?", recipeData, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'recipes',
                    locale: recipe.locale,
                    value: recipe.title,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'description',
                    reference_type: 'recipes',
                    locale: recipe.locale,
                    value: recipe.description,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'content',
                    reference_type: 'recipes',
                    locale: recipe.locale,
                    value: recipe.content,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]
            for(let i = 0; i < transData.length; i++){
                let post  = transData[i]
                dbConn.query('INSERT INTO translations SET ?', post, function(err, res) {
                    if (err) {
                        result(err, null);
                    }
                    else {
                        result(null, res.affectedRows)
                    }
                });
            }
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

Recipe.update = (id, recipe, result) => {
    let imageJson = JSON.stringify(recipe.images)
    dbConn.query("UPDATE recipes SET type=?,images=? ,prep_time=?,total_time=?,servings=?,calories=? ,views=?,active=? WHERE id = ?", [recipe.type,imageJson,recipe.prep_time,recipe.total_time,recipe.servings,recipe.calories,recipe.views,recipe.active, id],  (err, res) =>{
          if(err) {
              return result(null, err)
          }else{  
              const transData =  [
                {   translation_type: 'title',
                    reference_type: 'recipes',
                    locale: recipe.locale,
                    value: recipe.title,
                    reference_id: id
                },
                {  
                    translation_type: 'description',
                    reference_type: 'recipes',
                    locale: recipe.locale,
                    value: recipe.description,
                    reference_id: id
                },
                {  
                    translation_type: 'content',
                    reference_type: 'recipes',
                    locale: recipe.locale,
                    value: recipe.content,
                    reference_id: id
                }
            ]
             for(let i = 0; i < transData.length; i++){
                  let update  = transData[i]
                  let updateQuery  = "update translations SET value='"+update.value+"' WHERE reference_id = "+id+ " AND  reference_type = 'recipes' AND locale = '"+update.locale+"' AND translation_type='"+update.translation_type+"' " 
                  dbConn.query(updateQuery, function(err, res) {
                      if (err) {
                          return result(err, null);
                      }
                      else {
                          return result(null, res.affectedRows)
                      }
                  });
              }
          }
      }); 
  };
Recipe.deleteByID = (id, result)=>{
    const query = "DELETE FROM recipes WHERE id ="+id
     dbConn.query(query,  (err, res)=> {
        if(err) {
            return result(null, err);
        }
        else{
            const trans = `DELETE FROM translations WHERE reference_id =${id} AND reference_type= "recipes"`
            dbConn.query(trans,  (err, res)=> {
                if(err) {
                   return  result(null, err);
                }
                else{
                    result(null, res);
                }
            })
        }
    })
}  

module.exports = Recipe