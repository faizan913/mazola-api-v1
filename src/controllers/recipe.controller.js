const Recipe = require('../models/recipe.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Recipe.findAll(lang,(err, recipes)=> {
    if (err){res.send(err)}
    else{
        if(recipes.length>0){
            res.send({"success": true ,'data':{recipes}})
        }else{
            res.status(404).send({ error:false, message: 'No video found'})
        }}
  })
}
 
 exports.create = (req, res) =>{
    const newRecipe = new Video(req.body)
    newRecipe.filename = (req.file.filename)
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Recipe.create(newRecipe, (err, video) =>{
            if (err){ res.send(err)}
           else{
                res.json({success:true,message:"Product added successfully!",data:newVideo})
           }
        });
    }
}


 exports.findById = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Recipe.findById(lang,req.params.id, (err, recipe)=> {
        if (err){res.send(err)}
    else{
        if(recipe.length>0){
            res.send({"success": true ,'data':{'recipe':recipe[0]}})
        }else{
            res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}

/*
exports.update = (req, res) =>{
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Recipe.update(req.params.id, new Category(req.body), (err, category) =>{
            if (err)
            res.send(err)
            res.json({ success:true, message: 'Category successfully updated' });
        })
    }
  
}


exports.delete = (req, res) =>{
    Recipe.delete( req.params.id, (err, product) =>{
    if (err){res.send(err)}
    else{
        if(product.affectedRows>0){
        res.json({ success:true, message: 'Product  deleted', data:  product})
        }else{
            res.json({ error:false, message: 'No records found'})
        }
    }   
  })
}  */