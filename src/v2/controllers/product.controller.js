const Product = require('../models/product.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Product.findAll(lang,(err, products)=> {
    if (err){res.send(err)}
    else{
        if(products.length>0){
            res.status(200).send(products)
        } 
        else{
            res.status(404).send({ error:false, message: 'No product found'})
        }}
  })
}
 
exports.create = (req, res) =>{
    const newProducts = new Product(req.body)
    console.log(newProducts)
    locale = (JSON.stringify(req.headers['locale']))
    newProducts.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '')
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Product.create(newProducts, (err, product) =>{
            if (err){ return res.send(err)}
           else{
               return  res.status(201).send(product)
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
                res.status(200).send(product[0])
            }else{
                res.status(404).send({ error:false, message: 'No records found'})
            }
        }
    })
}


exports.update = (req, res) =>{
    const newProducts = new Product(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newProducts.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '')
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Product.update(req.params.id, newProducts, (err, product) =>{
            if (err){return res.send(err)
            }else{
            return res.status(200).send(product);
            }
        })
    }
  
}

exports.deleteByID = (req, res) =>{
  Product.deleteByID( req.params.id, (err, product) =>{
    if (err){res.send(err)}
    else{
        if(product.affectedRows>0){
        res.status(200).send({ success:true, message: 'Product  deleted'})
        }else{
            res.json({ error:false, message: 'No records found'})
        }
    }   
  })
} 