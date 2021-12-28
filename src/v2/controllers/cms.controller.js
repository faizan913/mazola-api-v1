const CMS = require('../models/cms.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    CMS.findAll(lang,(err, cms)=> {
        if (err) { res.send(err) 
        } else {
            if (cms.length > 0) {
                res.send({"success": true ,'data':{cms}})
            } else {
                res.status(404).send({ success: false, message: 'No records found' })
            }
        }
  })
}
 
 exports.create = (req, res) =>{
    const newVideo = new Video(req.body)
    newVideo.filename = (req.file.filename)
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        CMS.create(newVideo, (err, video) =>{
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
    CMS.findById(lang,req.params.id, (err, cms)=> {
        if (err) { res.send(err) 
        } else {
            if (cms.length > 0) {
                res.send({ success: true, 'data': {'cms':cms[0]} })
            } else {
                res.send({ error: false, message: 'No records found' })
            }
        }
    })
}

/*
exports.update = (req, res) =>{
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        CMS.update(req.params.id, new Category(req.body), (err, category) =>{
            if (err)
            res.send(err)
            res.json({ success:true, message: 'Category successfully updated' });
        })
    }
  
}


exports.delete = (req, res) =>{
    CMS.delete( req.params.id, (err, product) =>{
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