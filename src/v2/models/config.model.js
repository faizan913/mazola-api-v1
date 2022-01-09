const dbConn = require('../../../config/db.config');


const Config = function(config){
    this.config_group          = config.config_group
    this.name           = config.name
    this.type           = config.type
    this.show_title     = config.show_title
    this.header         = config.header
    this.active         = config.active
    this.archived       = config.archived
    this.title          = config.title
    this.description    = config.description
    this.link_url       = config.link_url
    this.image_url      = config.image_url
    this.locale         = config.locale
    this.created_at      = new Date()
    this.updated_at      = new Date()
}
Config.create = function (newConfig, result) {  
    const configData ={
        config_group : newConfig.config_group,
        name  :newConfig.name,
        type   :newConfig.type,
        show_title :newConfig.show_title,
        header     :newConfig.header,
        active     :newConfig.active,
        archived    :newConfig.archived,
        created_at:new Date(),
        updated_at: new Date()
    } 
    
    dbConn.query("INSERT INTO configs set ?", configData, function (err, congRes) {
        if(err) {
            result(err, null);
        }
        else{
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'configs',
                    locale: newConfig.locale,
                    value: newConfig.title,
                    reference_id: congRes.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'description',
                    reference_type: 'configs',
                    locale: newConfig.locale,
                    value: newConfig.description,
                    reference_id: congRes.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'link_url',
                    reference_type: 'configs',
                    locale: newConfig.locale,
                    value: newConfig.link_url,
                    reference_id: congRes.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {  
                    translation_type: 'image_url',
                    reference_type: 'configs',
                    locale: newConfig.locale,
                    value: newConfig.image_url,
                    reference_id: congRes.insertId,
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
                      let {  created_at,updated_at,locale,archived, ...all} = newConfig
                       result(null, { id: congRes.insertId, ...all });
                });
            }
        }
    })           
}
Config.findById =  (lang,id, result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "configs" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "configs" and t.translation_type = "description" and t.locale = '+lang+') as "description" ,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "configs" and t.translation_type = "link_url" and t.locale = '+lang+') as "link_url" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "configs" and t.translation_type = "image_url" and t.locale = '+lang+') as "image_url", c.config_group , c.name,c.type,c.show_title,c.header FROM configs c where c.id='+id
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
} 


Config.findAll =  (lang,result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "configs" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "configs" and t.translation_type = "description" and t.locale = '+lang+') as "description" ,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "configs" and t.translation_type = "link_url" and t.locale = '+lang+') as "link_url" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "configs" and t.translation_type = "image_url" and t.locale = '+lang+') as "image_url", c.config_group , c.name,c.type,c.show_title,c.header FROM configs c'
    dbConn.query(query,  (err, res)=> {
        if(err) {
            return result(null, err)
        }
        else{
            return result(null, res)
        }
    })   
}

Config.update = (id, config, result) => {
   console.log(id)
   console.log(config)
   let updateQuery  = "update configs SET config_group='"+config.config_group+"',name='"+config.name+"',type='"+config.type+"',show_title='"+config.show_title+"',header='"+config.header+"',active='"+config.active+"',archived='"+config.archived+"'  WHERE id = "+id+ "  " 
    //console.log(updateQuery)

   dbConn.query(updateQuery,  (err, res) =>{
        if(err) {
            return result(null, err)
        }else{  
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'configs',
                    locale: config.locale,
                    value: config.title,
                    reference_id: id
                },
                {  
                    translation_type: 'description',
                    reference_type: 'configs',
                    locale: config.locale,
                    value: config.description,
                    reference_id: id
                },
                {  
                    translation_type: 'link_url',
                    reference_type: 'configs',
                    locale: config.locale,
                    value: config.link_url,
                    reference_id: id
                },
                {  
                    translation_type: 'image_url',
                    reference_type: 'configs',
                    locale: config.locale,
                    value: config.image_url,
                    reference_id: id
                }
            ]
           for(let i = 0; i < transData.length; i++){
                let update  = transData[i]
                let updateQuery  = "update translations SET value='"+update.value+"' WHERE reference_id = "+id+ " AND  reference_type = 'configs' AND locale = '"+update.locale+"' AND translation_type='"+update.translation_type+"' " 
 
                dbConn.query(updateQuery, function(err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                      }
                      if (res.affectedRows == 0) {
                        result({ message: "Not update" }, null);
                        return;
                      }                      
                      let { created_at,updated_at,locale, archived,...all} = config //destructure of obj object
                      result(null,  {id:id,...all} );
                });
            }
        }
    }); 
};
Config.deleteByID = (id, result)=>{
    const query = "DELETE FROM configs WHERE id ="+id
     dbConn.query(query,  (err, res)=> {
        if(err) {
            return result(null, err);
        }
        else{
            const trans = `DELETE FROM translations WHERE reference_id =${id} AND reference_type= "configs"`
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

module.exports= Config;