const dbConn = require('../../../config/db.config');


const News = function (product) {
    this.category_id = product.category_id
    this.uom = product.uom
    this.size = product.size
    this.price = product.price
    this.images = product.images
    this.discounted_price = product.discounted_price
    this.active = product.active
    this.archived = product.archived
    this.refrence_type = product.refrence_type
    this.translation_type = product.translation_type
    this.locale = product.locale
    this.value = product.value
    this.refrence_type = product.refrence_type
    this.created_at = new Date()
    this.updated_at = new Date()
}
News.create = function (product, result) {
    //console.log(product)
    const productData = {
        category_id:product.category_id,
        uom :product.uom,
        size : product.size,
        price : product.price,
        images: product.filename,
        discounted_price :product.discounted_price,
        active : product.active,
        archived : product.archived,
        created_at: new Date(),
        updated_at: new Date()
    }

    dbConn.query("INSERT INTO products set ?", productData, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            //result(null, res.insertId)
            const translationData = {
                translation_type: product.translation_type,
                refrence_type: product.refrence_type,
                locale: product.locale,
                value: product.value,
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
News.findById =  (locale,id, result)=> {
    const query = 'SELECT n.id,(select t.value from translations t where t.reference_id = n.id AND t.reference_type = "news" and t.translation_type = "title" and t.locale = '+locale+')as "title" , (select t.value from translations t where t.reference_id = n.id AND t.reference_type = "news" and t.translation_type = "description" and t.locale = '+locale+')as "description", (select t.value from translations t where t.reference_id = n.id AND t.reference_type = "news" and t.translation_type = "content" and t.locale = '+locale+')as "content", n.featured_image,n.thumbnail,n.views FROM news n where n.id='+id
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
} 
News.findAll = (locale,result) => {
    const query = 'SELECT n.id,(select t.value from translations t where t.reference_id = n.id AND t.reference_type = "news" and t.translation_type = "title" and t.locale = '+locale+')as "title" , (select t.value from translations t where t.reference_id = n.id AND t.reference_type = "news" and t.translation_type = "description" and t.locale = '+locale+')as "description", (select t.value from translations t where t.reference_id = n.id AND t.reference_type = "news" and t.translation_type = "content" and t.locale = '+locale+')as "content", n.featured_image,n.thumbnail,n.views FROM news n'
    dbConn.query(query, (err, res) => {
        if (err) {
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

/* Product.update = (id, products, result) => {
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
};*/
News.delete = (id, result)=>{
     dbConn.query("DELETE products, translations FROM products INNER JOIN translations ON products.id = translations.reference_id WHERE products.id= ?", [id],  (err, res)=> {
        if(err) {
            result(null, err);
        }
        else{
            //console.log(res.affectedRows)
            result(null, res);
        }
    })
}  

module.exports = News