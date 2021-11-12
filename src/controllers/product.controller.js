const e = require('express');
const Product = require('../models/product.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Product.findAll(lang,(err, products)=> {
    if (err){res.send(err)}
    else{
        if(products.length>0){
            res.send({"success": true ,'data':{products}})
        } 
        else{
            res.status(404).send({ error:false, message: 'No product found'})
        }}
  })
}
 
exports.create = (req, res) =>{
    const newProducts = new Product(req.body)
    console.log(newProducts )
    return
    newProducts.locale = (req.headers.locale)
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Product.create(newProducts, (err, product) =>{
            if (err){ res.send(err)}
           else{
                res.json({success:true,message:"Product added successfully!",data:product})
           }
        });
    }
}


 exports.findById = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Product.findById(lang,req.params.id, (err, product)=> {
        if (err) {res.send(err)}
        else{
            if(product.length>0){
                res.send({"success": true ,'data':{'product':product[0]}})
            }else{
                res.status(404).send({ error:false, message: 'No records found'})
            }
        }
    })
}

/*
exports.update = (req, res) =>{
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Category.update(req.params.id, new Category(req.body), (err, category) =>{
            if (err)
            res.send(err)
            res.json({ success:true, message: 'Category successfully updated' });
        })
    }
  
}*/


exports.delete = (req, res) =>{
  Product.delete( req.params.id, (err, product) =>{
    if (err){res.send(err)}
    else{
        if(product.affectedRows>0){
        res.json({ success:true, message: 'Product  deleted', data:  product})
        }else{
            res.json({ error:false, message: 'No records found'})
        }
    }   
  })
} 