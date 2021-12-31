const dbConn = require('../../../config/db.config');


const CMS = function (cms) {
    this.title=cms.title,
    this.description=cms.description,
    this.content=cms.content,
    this.meta_url =cms.meta_url,
    this.featured_image=cms.featured_image,
    this.type =cms.type,
    this.template =cms.template,
    this.active=cms.active,
    this.archived =cms.archived,
    this.created_at= new Date(),
    this.updated_at= new Date()
}
CMS.create = function (cms, result) {
    const cmsData = {
        type:cms.type,
        template :cms.template,
        featured_image : cms.featured_image,
        meta_url : cms.meta_url,
        active : cms.active,
        archived : cms.archived,
        created_at: new Date(),
        updated_at: new Date()
    } 

    dbConn.query("INSERT INTO cms set ?", cmsData, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
           
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'cms',
                    locale: cms.locale,
                    value: cms.title,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'description',
                    reference_type: 'cms',
                    locale: cms.locale,
                    value: cms.description,
                    reference_id: res.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'content',
                    reference_type: 'cms',
                    locale: cms.locale,
                    value: cms.content,
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

CMS.findById =  (locale,id, result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "title" and t.locale = '+locale+')as "title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "description" and t.locale = '+locale+')as "description"  , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "content" and t.locale = '+locale+')as "content",c.featured_image,c.type,c.template,c.meta_url FROM cms c where c.id='+id
    dbConn.query(query,  (err, res)=> {             
        if(err) {
           return result(err, null);
        }
        else{
            return  result(null, res);
        }
    })   
}  
CMS.findAll = (locale,result) => {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "title" and t.locale = '+locale+')as "title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "description" and t.locale = '+locale+')as "description"  , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "content" and t.locale = '+locale+')as "content", (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "cms" and t.translation_type = "images" and t.locale = '+locale+')as "images", c.featured_image,c.type,c.template FROM cms c'
    dbConn.query(query, (err, res) => {
        if (err) {
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

CMS.update = (id, cms, result) => {
    dbConn.query("UPDATE cms SET type=?,template=? ,featured_image=?,meta_url=?,active=? WHERE id = ?", [cms.type,cms.template,cms.featured_image,cms.meta_url,cms.active, id],  (err, res) =>{
          if(err) {
              return result(null, err)
          }else{  
              const transData = [
                {   translation_type: 'title',
                    reference_type: 'cms',
                    locale: cms.locale,
                    value: cms.title,
                    reference_id: id,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'description',
                    reference_type: 'cms',
                    locale: cms.locale,
                    value: cms.description,
                    reference_id: id,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'content',
                    reference_type: 'cms',
                    locale: cms.locale,
                    value: cms.content,
                    reference_id: id,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]
             for(let i = 0; i < transData.length; i++){
                  let update  = transData[i]
                  let updateQuery  = "update translations SET value='"+update.value+"' WHERE reference_id = "+id+ " AND  reference_type = 'cms' AND locale = '"+update.locale+"' AND translation_type='"+update.translation_type+"' " 
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
CMS.deleteByID = (id, result)=>{
    const query = "DELETE FROM cms WHERE id ="+id
     dbConn.query(query,  (err, res)=> {
        if(err) {
            return result(null, err);
        }
        else{
            const trans = `DELETE FROM translations WHERE reference_id =${id} AND reference_type= "cms"`
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

module.exports = CMS