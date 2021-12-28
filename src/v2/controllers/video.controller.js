const Video = require('../models/video.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale 
    Video.findAll(req.query.type,lang,(err, videos)=> {
    if (err){res.send(err)}
    else{
        if(videos.length>0){
            res.send({"success": true ,'data':{videos}})
        } 
        else{
            res.status(404).send({ error:false, message: 'No recort found'})
        }}
    })
}
 
 exports.create = (req, res) =>{
    const newVideo = new Video(req.body)
    newVideo.filename = (req.file.filename)
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Video.create(newVideo, (err, video) =>{
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
    Video.findById(lang,req.params.id, (err, video)=> {
        if (err){res.send(err)}
         else{
            if(video.length>0){
                res.send({"success": true ,'data':{'video':video[0]}})
            } 
            else{
                res.status(404).send({ error:false, message: 'No recort found'})
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
  
}


exports.delete = (req, res) =>{
    Video.delete( req.params.id, (err, product) =>{
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