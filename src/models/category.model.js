const dbConn = require('../../config/db.config');


const Category = function(category){
    this.active          = category.active
    this.parent_id       = category.parent_id
    this.title           = category.title
    this.description     = category.description
    this.locale          = category.locale
    this.refrence_type   = category.refrence_type,
    this.created_at      = new Date()
    this.updated_at      = new Date()
}
Category.create = function (newCat, result) {  
    const categoryData ={
        active :newCat.active,
        parent_id: newCat.parent_id,
        created_at:new Date(),
        updated_at: new Date()
    } 
    
    dbConn.query("INSERT INTO categories set ?", categoryData, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'categories',
                    locale: newCat.locale,
                    value: newCat.title,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'description',
                    reference_type: 'categories',
                    locale: newCat.locale,
                    value: newCat.description,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]
            for(let i = 0; i < transData.length; i++){
                let post  = transData[i]
                dbConn.query('INSERT INTO translations SET ?', post, function(err, res) {
                    if (err) {
                        return result(err, null);
                    }
                    else {
                        return result(null, res)
                    }
                });
            }
        }
    })           
}
Category.findById =  (lang,id, result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "categories" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "categories" and t.translation_type = "description" and t.locale = '+lang+') as "description",c.parent_id FROM categories c where c.id='+id
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
} 

//Get all product belongs to specific category

Category.findAllProductByCatId =  (lang,id, result)=> {
    const query = 'SELECT p.id,(select t.value from translations t where t.reference_id = p.id AND t.reference_type = "products" and t.translation_type = "title" and t.locale = '+lang+')as "title" ,(select t.value from translations t where t.reference_id = p.id AND t.reference_type = "products" and t.translation_type = "description" and t.locale = '+lang+')as "description",(select t.value from translations t where t.reference_id = p.id AND t.reference_type = "products" and t.translation_type = "nutrition" and t.locale = '+lang+')as "nutrition",(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "categories" and t.translation_type = "title" and t.locale = '+lang+')as "category" ,p.images,p.uom,p.size,p.price,p.featured_image,p.discounted_price FROM products p left join categories c on c.id = p.category_id where c.id='+ id
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
} 
Category.findAll =  (lang,result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "categories" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "categories" and t.translation_type = "description" and t.locale = '+lang+') as "description",c.parent_id FROM categories c'
    dbConn.query(query,  (err, res)=> {
        if(err) {
            result(null, err)
        }
        else{
            result(null, res)
        }
    })   
}

Category.update = (id, category, result) => {
   
  dbConn.query("UPDATE categories SET active=?,parent_id=? WHERE id = ?", [category.active,category.parent_id, id],  (err, res) =>{
        if(err) {
            return result(null, err)
        }else{  
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'categories',
                    locale: category.locale,
                    value: category.title,
                    reference_id: id,
                },
                {  
                    translation_type: 'description',
                    reference_type: 'categories',
                    locale: category.locale,
                    value: category.description,
                    reference_id: id,
                    
                }
            ]
           for(let i = 0; i < transData.length; i++){
                let update  = transData[i]
                let updateQuery  = "update translations SET value='"+update.value+"' WHERE reference_id = "+id+ " AND  reference_type = 'categories' AND locale = '"+update.locale+"' AND translation_type='"+update.translation_type+"' " 
 
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
Category.deleteByID = (id, result)=>{
    const query = "DELETE FROM categories WHERE id ="+id
     dbConn.query(query,  (err, res)=> {
        if(err) {
            return result(null, err);
        }
        else{
            const trans = `DELETE FROM translations WHERE reference_id =${id} AND reference_type= "categories"`
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

module.exports= Category;