const News = require('../models/news.model');

exports.findAll = (req, res) => {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    News.findAll(lang, (err, news) => {
        if (err) { res.send(err) }
        else {
            if (news.length > 0) {
                res.status(200).send(news)
            } else {
                res.send({ error: false, message: 'No records found' })
            }
        }
    })
}

exports.create = (req, res) => {
    const newsData = new News(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newsData.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '')
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        News.create(newsData, (err, news) => {
            if (err) {return  res.send(err) }
            else {
                res.status(201).json(news)
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
                res.send(news[0])
            } else {
                res.status(404).send({ error: false, message: 'No records found ' })
            }
        }
    })
}


exports.update = (req, res) =>{
    const newsData = new News(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newsData.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '')
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        News.update(req.params.id, newsData, (err, news) =>{
            if (err){ return res.send(err) }
            else{res.status(200).json(news) }
        })
    }
  
}


exports.deleteByID = (req, res) =>{
    News.deleteByID( req.params.id, (err, cms) =>{
    if (err){return  res.send(err)}
    else{
      if(cms.affectedRows>0){
        res.json({ success:true, message: 'cms  deleted'})
        }else{
            res.status(404).json({ error:false, message: 'No records found'})
        }
    }   
  })
}  