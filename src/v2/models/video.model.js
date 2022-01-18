const dbConn = require('../../../config/db.config');


const Video = function (video) {
    this.title = video.title
    this.description = video.description
    this.type = video.type
    this.thumbnail = video.thumbnail
    this.views = video.views
    this.active = video.active
    this.archived = video.archived
    this.video_url = video.video_url
    this.refrence_type = video.refrence_type
    this.locale = video.locale
    this.created_at = new Date()
    this.updated_at = new Date()
}
 Video.create = function (video, result) {
    //console.log(product)
    const videoData = {
        type:video.type,
        views :video.views,
        thumbnail: video.thumbnail,
        active : video.active,
        archived : video.archived,
        video_url : video.video_url,
        created_at: new Date(),
        updated_at: new Date()
    }

    dbConn.query("INSERT INTO videos set ?", videoData, function (err, vRes) {
        if (err) {
            result(err, null);
        }
        else{
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'videos',
                    locale: video.locale,
                    value: video.title,
                    reference_id: vRes.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {   translation_type: 'description',
                    reference_type: 'videos',
                    locale: video.locale,
                    value: video.description,
                    reference_id: vRes.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]
            for(let i = 0; i < transData.length; i++){
                let post  = transData[i]
                dbConn.query('INSERT INTO translations SET ?', post, function(err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                      }
                      let {  created_at,updated_at,locale,archived, ...all} = video
                       result(null, { id: vRes.insertId, ...all });
                });
            }
        }
    })
}

Video.findById =  (lang,id, result)=> {
    const query = 'SELECT v.id,(select t.value from translations t where t.reference_id = v.id AND t.reference_type = "videos" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = v.id AND t.reference_type = "videos" and t.translation_type = "description" and t.locale = '+lang+')as "description",v.type,v.thumbnail,v.views,v.video_url FROM videos v where v.id='+id

    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
} 
Video.findAll = (type,lang,result) => {
    const query = 'SELECT v.id,(select t.value from translations t where t.reference_id = v.id AND t.reference_type = "videos" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = v.id AND t.reference_type = "videos" and t.translation_type = "description" and t.locale = '+lang+')as "description",v.type,v.thumbnail,v.views,v.video_url FROM videos v where type='+type
   console.log(query)
    dbConn.query(query, (err, res) => {
        if (err) {
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

Video.update = (id, video, result) => {
   
    dbConn.query("UPDATE videos SET active=?,type=?,thumbnail=?,views=? ,video_url=? WHERE id = ?", [video.active,video.type,video.thumbnail,video.views,video.video_url, id],  (err, res) =>{
          if(err) {
              return result(null, err)
          }else{  
              const transData = [
                  {   translation_type: 'title',
                      reference_type: 'videos',
                      locale: video.locale,
                      value: video.title,
                      reference_id: id,
                  },
                  {   translation_type: 'description',
                      reference_type: 'videos',
                      locale: video.locale,
                      value: video.description,
                      reference_id: id,
                  }
              ]
             for(let i = 0; i < transData.length; i++){
                  let update  = transData[i]
                  let updateQuery  = "update translations SET value='"+update.value+"' WHERE reference_id = "+id+ " AND  reference_type = 'videos' AND locale = '"+update.locale+"' AND translation_type='"+update.translation_type+"' " 
   
                  dbConn.query(updateQuery, function(err, res) {
                      if (err) {
                          console.log("error: ", err);
                          result(null, err);
                          return;
                        }
                        if (res.affectedRows == 0) {
                          // not found Tutorial with the id
                          result({ message: "Not update" }, null);
                          return;
                        }
                        let {  created_at,updated_at,locale,archived, ...all} = video
                        result(null, { id: id, ...all });
                      
                  });
              }
          }
      }); 
  };
  Video.deleteByID = (id, result)=>{
      const query = "DELETE FROM videos WHERE id ="+id
       dbConn.query(query,  (err, res)=> {
          if(err) {
              return result(null, err);
          }
          else{
              const trans = `DELETE FROM translations WHERE reference_id =${id} AND reference_type= "videos"`
              dbConn.query(trans,  (err, res)=> {
                  if (err) {
                      console.log("error: ", err);
                      result(null, err);
                      return;
                    }
                    if (res.affectedRows == 0) {
                      result({ kind: "not_found" }, null);
                      return;
                    }
                    result(null, res);
              })
          }
      })
  } 
  

module.exports = Video