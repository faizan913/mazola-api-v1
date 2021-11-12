const dbConn = require('../../config/db.config');


const CMS = function (video) {
    this.type = video.type
    this.thumbnail = video.thumbnail
    this.views = video.views
    this.active = video.active
    this.archived = video.archived
    this.refrence_type = video.refrence_type
    this.translation_type = video.translation_type
    this.locale = video.locale
    this.value = video.value
    this.refrence_type = video.refrence_type
    this.created_at = new Date()
    this.updated_at = new Date()
}
CMS.create = function (video, result) {
    //console.log(product)
    const videoData = {
        type:video.type,
        views :video.views,
        thumbnail: video.filename,
        active : video.active,
        archived : video.archived,
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
                translation_type: video.translation_type,
                refrence_type: video.refrence_type,
                locale: video.locale,
                value: video.value,
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

CMS.findById =  (locale,id, result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "title" and t.locale = '+locale+')as "title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "description" and t.locale = '+locale+')as "description"  , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "content" and t.locale = '+locale+')as "content",c.featured_image,c.type,c.template,c.meta_url FROM cms c where c.id='+id
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
}  
CMS.findAll = (locale,result) => {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "title" and t.locale = '+locale+')as "title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "description" and t.locale = '+locale+')as "description"  , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "content" and t.locale = '+locale+')as "content", (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "images" and t.locale = '+locale+')as "images", c.featured_image,c.type,c.template FROM cms c'
    dbConn.query(query, (err, res) => {
        if (err) {
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

/* CMS.update = (id, products, result) => {
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
CMS.delete = (id, result)=>{
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

module.exports = CMS