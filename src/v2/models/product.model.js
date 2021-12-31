const dbConn = require('../../../config/db.config');


const Product = function (product) {
    this.category_id=product.category_id,
    this.title=product.title,
    this.short_description=product.short_description,
    this.long_description=product.long_description,
    this.uom =product.uom,
    this.size = product.size,
    this.price =product.price,
    this.images=product.images,
    this.featured_image=product.featured_image,
    this.discounted_price =product.discounted_price,
    this.active=product.active,
    this.archived =product.archived,
    this.created_at= new Date(),
    this.updated_at= new Date()
}
Product.create = function (product, result) {
    let imageJson = JSON.stringify(product.images)
    const productData = {
        category_id:product.category_id,
        uom :product.uom,
        size : product.size,
        price : product.price,
        images: imageJson,
        featured_image:product.featured_image,
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
                    reference_type: 'products',
                    locale: product.locale,
                    value: product.title,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'short_description',
                    reference_type: 'products',
                    locale: product.locale,
                    value: product.short_description,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'long_description',
                    reference_type: 'products',
                    locale: product.locale,
                    value: product.long_description,
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

Product.update = (id, product, result) => {
    let imageJson = JSON.stringify(product.images)
    dbConn.query("UPDATE products SET category_id=?,featured_image=? ,images=?,uom=?,size=? ,price=?,discounted_price=?,active=? WHERE id = ?", [product.category_id,product.featured_image,imageJson,product.uom,product.size,product.price,product.discounted_price,product.active, id],  (err, res) =>{
          if(err) {
              return result(null, err)
          }else{  
              const transData = [
                {   translation_type: 'title',
                    reference_type: 'products',
                    locale: product.locale,
                    value: product.title,
                    reference_id: id
                },
                {  
                    translation_type: 'short_description',
                    reference_type: 'products',
                    locale: product.locale,
                    value: product.short_description,
                    reference_id: id
                },
                {  
                    translation_type: 'long_description',
                    reference_type: 'products',
                    locale: product.locale,
                    value: product.long_description,
                    reference_id: id
                }
            ]
             for(let i = 0; i < transData.length; i++){
                  let update  = transData[i]
                  let updateQuery  = "update translations SET value='"+update.value+"' WHERE reference_id = "+id+ " AND  reference_type = 'products' AND locale = '"+update.locale+"' AND translation_type='"+update.translation_type+"' " 
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
  Product.deleteByID = (id, result)=>{
    const query = "DELETE FROM products WHERE id ="+id
     dbConn.query(query,  (err, res)=> {
        if(err) {
            return result(null, err);
        }
        else{
            const trans = `DELETE FROM translations WHERE reference_id =${id} AND reference_type= "products"`
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


module.exports = Product