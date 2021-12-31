const dbConn = require('../../../config/db.config');


const News = function (news) {
    this.title=news.title,
    this.description=news.description,
    this.content=news.content,
    this.thumbnail =news.thumbnail,
    this.featured_image=news.featured_image,
    this.views=news.views,
    this.active=news.active,
    this.archived =news.archived,
    this.created_at= new Date(),
    this.updated_at= new Date()
}
News.create = function (news, result) {
    const newsData = {
        thumbnail :news.thumbnail,
        featured_image:news.featured_image,
        views:news.views,
        active:news.active,
        archived :news.archived,
        created_at: new Date(),
        updated_at: new Date()
    } 

    dbConn.query("INSERT INTO news set ?", newsData, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
           
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'news',
                    locale: news.locale,
                    value: news.title,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'description',
                    reference_type: 'news',
                    locale: news.locale,
                    value: news.description,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'content',
                    reference_type: 'news',
                    locale: news.locale,
                    value: news.content,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]
            for(let i = 0; i < transData.length; i++){
                let post  = transData[i]
                dbConn.query('INSERT INTO translations SET ?', post, function(err, res) {
                    if (err) {
                        result(err, null);
                    }
                    else {
                        result(null, res.affectedRows)
                    }
                });
            }
        }
    })
}

News.findById =  (locale,id, result)=> {
    const query = 'SELECT n.id,(select t.value from translations t where t.reference_id = n.id AND t.reference_type = "news" and t.translation_type = "title" and t.locale = '+locale+')as "title" , (select t.value from translations t where t.reference_id = n.id AND t.reference_type = "news" and t.translation_type = "description" and t.locale = '+locale+')as "description", (select t.value from translations t where t.reference_id = n.id AND t.reference_type = "news" and t.translation_type = "content" and t.locale = '+locale+')as "content", n.featured_image,n.thumbnail,n.views FROM news n where n.id='+id
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
} 
News.findAll = (locale,result) => {
    const query = 'SELECT n.id,(select t.value from translations t where t.reference_id = n.id AND t.reference_type = "news" and t.translation_type = "title" and t.locale = '+locale+')as "title" , (select t.value from translations t where t.reference_id = n.id AND t.reference_type = "news" and t.translation_type = "description" and t.locale = '+locale+')as "description", (select t.value from translations t where t.reference_id = n.id AND t.reference_type = "news" and t.translation_type = "content" and t.locale = '+locale+')as "content", n.featured_image,n.thumbnail,n.views FROM news n'
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

News.update = (id, news, result) => {
    dbConn.query("UPDATE news SET thumbnail=?,featured_image=? ,views=?,active=? WHERE id = ?", [news.thumbnail,news.featured_image,news.views,news.active, id],  (err, res) =>{
          if(err) {
              return result(null, err)
          }else{  
              const transData = [
                {   translation_type: 'title',
                    reference_type: 'news',
                    locale: news.locale,
                    value: news.title,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'description',
                    reference_type: 'news',
                    locale: news.locale,
                    value: news.description,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'content',
                    reference_type: 'news',
                    locale: news.locale,
                    value: news.content,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]
             for(let i = 0; i < transData.length; i++){
                  let update  = transData[i]
                  let updateQuery  = "update translations SET value='"+update.value+"' WHERE reference_id = "+id+ " AND  reference_type = 'news' AND locale = '"+update.locale+"' AND translation_type='"+update.translation_type+"' " 
                  dbConn.query(updateQuery, function(err, res) {
                      if (err) {
                          return result(err, null);
                      }
                      else {
                          return result(null, res.affectedRows)
                      }
                  });
              }
          }
      }); 
  };
News.deleteByID = (id, result)=>{
    const query = "DELETE FROM news WHERE id ="+id
     dbConn.query(query,  (err, res)=> {
        if(err) {
            return result(null, err);
        }
        else{
            const trans = `DELETE FROM translations WHERE reference_id =${id} AND reference_type= "news"`
            dbConn.query(trans,  (err, res)=> {
                if(err) {
                   return  result(null, err);
                }
                else{
                    result(null, res);
                }
            })
        }
    })
}  

module.exports = News