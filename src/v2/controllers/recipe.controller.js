const Recipe = require('../models/recipe.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Recipe.findAll(lang,(err, recipes)=> {
    if (err){res.send(err)}
    else{
        if(recipes.length>0){
            res.status(200).send(recipes)
        }else{
            res.status(404).send({ error:false, message: 'No video found'})
        }}
  })
}
 
 exports.create = (req, res) =>{
    const newRecipe = new Recipe(req.body)
    let locale = (JSON.stringify(req.headers['locale']))
    newRecipe.locale= (locale === undefined) ? "en" :locale
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Recipe.create(newRecipe, (err, recipe) =>{
            if (err){ return res.send(err)}
           else{
                res.json({success:true,message:"Product added successfully!"})
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
            res.send(recipe[0])
        }else{
            res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}


exports.update = (req, res) =>{
    const newRecipe = new Recipe(req.body)
    let locale = (JSON.stringify(req.headers['locale']))
    newRecipe.locale= (locale === undefined) ? "en" :locale
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Recipe.update(req.params.id, newRecipe, (err, category) =>{
            if (err){ res.send(err)}
            else{ res.json({ success:true, message: 'Recipe updated' })}
        })
    }
  
}


exports.deleteByID = (req, res) =>{
    Recipe.deleteByID( req.params.id, (err, cms) =>{
    if (err){return  res.send(err)}
    else{
      if(cms.affectedRows>0){
        res.json({ success:true, message: 'recipe  deleted'})
        }else{
            res.status(404).json({ error:false, message: 'No records found'})
        }
    }   
  })
} 