const News = require('../models/news.model');

exports.findAll = (req, res) => {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    News.findAll(lang, (err, news) => {
        if (err) { res.send(err) }
        else {
            if (news.length > 0) {
                res.send({ success: true, 'data': {news} })
            } else {
                res.send({ error: false, message: 'No records found' })
            }
        }
    })
}

exports.create = (req, res) => {
    const newProducts = new Product(req.body)
    newProducts.filename = (req.file.filename)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        News.create(newProducts, (err, news) => {
            if (err) { res.send(err) }
            else {
                res.json({ success: true, message: "Product added successfully!", data: news })
            }
        });
    }
}


exports.findById = (req, res) => {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    News.findById(lang, req.params.id, (err, news) => {
        if (err) { res.send(err) }
        else {
            if (news.length > 0) {
                res.send({ success: true, 'data': {'news':news[0]} })
            } else {
                res.status(404).send({ error: false, message: 'No records found ' })
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


exports.delete = (req, res) => {
    News.delete(req.params.id, (err, product) => {
        if (err) { res.send(err) }
        else {
            if (product.affectedRows > 0) {
                res.json({ success: true, message: 'Product  deleted', data: product })
            } else {
                res.json({ error: false, message: 'No records found' })
            }
        }
    })
}