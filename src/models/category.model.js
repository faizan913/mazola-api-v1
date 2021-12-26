const dbConn = require('../../config/db.config');


const Category = function(category){
    this.active          = category.active
    this.parent_id       = category.parent_id
    this.refrence_type   = category.refrence_type
    this.translation_type= category.translation_type
    this.locale          = category.locale
    this.value           = category.value
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
            //result(null, res.insertId)
            const translationData ={
                translation_type :newCat.translation_type,
                refrence_type: newCat.refrence_type,
                locale: newCat.locale,
                value: newCat.value,
                reference_id:res.insertId,
                created_at:new Date(),
                updated_at: new Date()
            }
            dbConn.query("INSERT INTO translations set ?", translationData, function (err, res) {
                if(err) {
                    result(err, null);
                }
                else{
                    result(null, res.insertId)
                }
            }) 
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
            result(null, err)
        }else{  
            dbConn.query("UPDATE translations SET translation_type=?,refrence_type=? ,locale=? ,value=? WHERE reference_id = ?", 
            [category.translation_type,category.refrence_type,category.locale,category.value, id],  (err, res) =>{
                if(err) {
                    result(null, err)
                }else{   
                    result(null, res);
                }
            })
        }
    }); 
};
Category.deleteByID = (id, result)=>{
    const query = "DELETE FROM categories WHERE id ="+id
    console.log(query)
     dbConn.query(query,  (err, res)=> {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
} 

module.exports= Category;