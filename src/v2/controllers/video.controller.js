const Video = require('../models/video.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale 
    Video.findAll(req.query.type,lang,(err, videos)=> {
    if (err){res.send(err)}
    else{
        if(videos.length>0){
            res.status(200).send(videos)
        } 
        else{
            res.status(404).send({ error:false, message: 'No recort found'})
        }}
    })
}
 
 exports.create = (req, res) =>{
    const newVideo = new Video(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newVideo.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '') 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Video.create(newVideo, (err, video) =>{
            if (err){ res.send(err)}
           else{
                res.status(200).send(video)
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
                res.status(200).send(video[0])
            } 
            else{
                res.status(404).send({ error:false, message: 'No recort found'})
            }
        }
    })
}


exports.update = (req, res) =>{
    const newVideo = new Video(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newVideo.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '') 
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Video.update(req.params.id, newVideo, (err, video) =>{
            if (err){
                return res.send(err)
            }else{
                 return res.status(200).send(video);
            }
        })
    }
}

exports.deleteByID = (req, res) =>{
  Video.deleteByID( req.params.id, (err, video) =>{
    if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({ error:false, message: 'No recort found'})
        } else {
          res.status(500).send({ error:false, message: 'Could not delete'});
        }
      } else res.status(200).send({ success:true, message: 'Video deleted'});
  })
}