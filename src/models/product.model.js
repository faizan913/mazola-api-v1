const dbConn = require('../../config/db.config');


const Product = function (product) {
    this.category_id = product.category_id
    this.uom = product.uom
    this.size = product.size
    this.price = product.price
    this.images = product.images
    this.discounted_price = product.discounted_price
    this.active = product.active
    this.archived = product.archived
    this.title = product.title
    this.description = product.description
    /* this.refrence_type = product.refrence_type
    this.translation_type = product.translation_type
    this.locale = product.locale
    this.value = product.value
    this.refrence_type = product.refrence_type */
    this.created_at = new Date()
    this.updated_at = new Date()
}
Product.create = function (product, result) {
    
    const productData = {
        category_id:product.category_id,
        uom :product.uom,
        size : product.size,
        price : product.price,
        images: product.images,
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
           
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'product',
                    locale: product.locale,
                    value: product.title,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'description',
                    reference_type: 'product',
                    locale: product.locale,
                    value: product.description,
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
//set locale from header
Product.findById =  (lang,id, result)=> {
    const query = 'SELECT p.id,(select t.value from translations t where t.reference_id = p.id AND t.reference_type = "products" and t.translation_type = "title" and t.locale = '+lang+')as "title" ,(select t.value from translations t where t.reference_id = p.id AND t.reference_type = "products" and t.translation_type = "description" and t.locale = '+lang+')as "description",(select t.value from translations t where t.reference_id = p.id AND t.reference_type = "products" and t.translation_type = "nutrition" and t.locale = '+lang+')as "nutrition",(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "categories" and t.translation_type = "title" and t.locale = '+lang+')as "category" ,p.images,p.uom,p.size,p.price,p.featured_image,p.discounted_price FROM products p left join categories c on c.id = p.category_id where p.id ='+ id
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
} 
Product.findAll = (lang,result) => {
    const query = 'SELECT p.id,(select t.value from translations t where t.reference_id = p.id AND t.reference_type = "products" and t.translation_type = "title" and t.locale = '+lang+')as "title" ,(select t.value from translations t where t.reference_id = p.id AND t.reference_type = "products" and t.translation_type = "description" and t.locale = '+lang+')as "description",(select t.value from translations t where t.reference_id = p.id AND t.reference_type = "products" and t.translation_type = "nutrition" and t.locale = '+lang+')as "nutrition",(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "categories" and t.translation_type = "title" and t.locale = '+lang+')as "category" ,p.images,p.uom,p.size,p.price,p.featured_image,p.discounted_price FROM products p left join categories c on c.id = p.category_id'
   //console.log(query)
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
Product.delete = (id, result)=>{
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

module.exports = Product