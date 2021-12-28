const Category = require('../models/category.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Category.findAll(lang,(err, categories)=> {
        if (err){res.send(err)}
        else{
            if(categories.length>0){
                res.send({"success": true ,'data':{categories}})
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}
 
exports.create = (req, res) =>{
    const newCat = new Category(req.body)
    newCat.locale = (req.headers.locale)
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Category.create(newCat, (err, category) =>{
            if (err){ return res.send(err);}
           else{
            res.status(201).send({success:true,message:"Category added successfully!",data:newCat});
           }
        });
    }
}

exports.findAllProductByCatId = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Category.findAllProductByCatId(lang,req.params.id, (err, products)=> {
        
        if (err){res.send(err)}
        else{
            if(products.length>0){
                res.send({"success": true ,'data':{products}})
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}


exports.findById = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Category.findById(lang,req.params.id, (err, category)=> {
        if (err){res.send(err)}
        else{
            if(category.length>0){
                
                res.send({"success": true ,'data':{'category':category[0]}})
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}


exports.update = (req, res) =>{
    const newCat = new Category(req.body)
    newCat.locale = (req.headers.locale)
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Category.update(req.params.id, newCat, (err, category) =>{
            if (err){
                return res.send(err)
            }else{
                 return res.status(200).send({ success:true, message: 'Category successfully updated' });
            }
        })
    }
  
}


exports.deleteByID = (req, res) =>{
  Category.deleteByID( req.params.id, (err, category) =>{
    if (err){return res.send(err);}
    
    res.json({ success:true, message: 'Category  deleted', data:  category});
  })
}