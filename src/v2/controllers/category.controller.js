const Category = require('../models/category.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Category.findAll(lang,(err, categories)=> {
        if (err){res.send(err)}
        else{
            if(categories.length>0){
                res.send(categories)
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}
 
exports.create = (req, res) =>{
    const newCat = new Category(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newCat.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '') 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Category.create(newCat, (err, category) =>{
            if (err){ return res.send(err);}
           else{
           return res.status(201).send(category);
           }
        });
    }
}

exports.findAllProductByCatId = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Category.findAllProductByCatId(lang,req.params.id, (err, category)=> {
        
        if (err){res.send(err)}
        else{
            if(products.length>0){
                res.send(category)
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
                
                res.status(200).json(category[0])
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}


exports.update = (req, res) =>{
    const newCat = new Category(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newCat.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '') 
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Category.update(req.params.id, newCat, (err, category) =>{
            if (err){
                return res.send(err)
            }else{
                 return res.status(200).send(category);
            }
        })
    }
}

exports.deleteByID = (req, res) =>{
  Category.deleteByID( req.params.id, (err, category) =>{
    if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not record found with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete category with id " + req.params.id
          });
        }
      } else res.status(200).send({ message: `Category deleted with id ${req.params.id}` });
  })
}