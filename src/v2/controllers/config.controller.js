const Config = require('../models/config.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Config.findAll(lang,(err, config)=> {
        if (err){res.send(err)}
        else{
            if(config.length>0){
                res.send(config)
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}
 
exports.create = (req, res) =>{
    const newConfig = new Config(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newConfig.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '') 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Config.create(newConfig, (err, config) =>{
            if (err){ return res.send(err);}
           else{
           return res.status(201).send(config);
           }
        });
    }
}


exports.findById = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Config.findById(lang,req.params.id, (err, config)=> {
        if (err){res.send(err)}
        else{
            if(config.length>0){
                
                res.status(200).json(config[0])
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}


exports.update = (req, res) =>{
    const newConfig = new Config(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newConfig.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '')
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Config.update(req.params.id, newConfig, (err, config) =>{
            if (err){
                return res.send(err)
            }else{
                 return res.status(200).send(config);
            }
        })
    }
  
}


exports.deleteByID = (req, res) =>{
  Config.deleteByID( req.params.id, (err, config) =>{
    if (err){
        return res.send(err)
    }else{
        if(config.affectedRows>0){
          res.json({ success:true, message: 'config  deleted'})
          }else{
              res.json({ error:false, message: 'No records found'})
          }
        }
  })
}