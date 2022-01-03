const CMS = require('../models/cms.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    CMS.findAll(lang,(err, cms)=> {
        if (err) { res.send(err) 
        } else {
            if (cms.length > 0) {
                res.status(200).send(cms)
            } else {
                res.status(404).send({ success: false, message: 'No records found' })
            }
        }
  })
}
 
 exports.create = (req, res) =>{
    const newCMS = new CMS(req.body)
    let locale = (JSON.stringify(req.headers['locale']))
    newCMS.locale= (locale === undefined) ? "en" :locale 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        CMS.create(newCMS, (err, cms) =>{
            if (err){ return res.send(err)}
           else{
                res.status(201).send(cms)
           }
        });
    }
}


 exports.findById = (req, res)=> {  
    
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    console.log(lang,req.params.id)
    CMS.findById(lang,req.params.id, (err, cms)=> {
        if (err) { res.send(err) 
        } else {
            if (cms.length > 0) {
                return res.status(200).send(cms[0])
            } else {
                return res.send({ error: false, message: 'No records found' })
            }
        }
    })
}


exports.update = (req, res) =>{
    const newCMS = new CMS(req.body)
    let locale = (JSON.stringify(req.headers['locale']))
    newCMS.locale= (locale === undefined) ? "en" :locale 
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        CMS.update(req.params.id, newCMS, (err, cms) =>{
            if (err){return res.send(err)}
            else{return res.status(200).send(cms)}
        })
    }
  
}


 exports.deleteByID = (req, res) =>{
    CMS.deleteByID( req.params.id, (err, cms) =>{
    if (err){res.send(err)}
    else{
      if(cms.affectedRows>0){
        res.json({ success:true, message: 'cms  deleted'})
        }else{
            res.json({ error:false, message: 'No records found'})
        }
    }   
  })
}  