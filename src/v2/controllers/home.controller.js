const fs = require('fs') 
  exports.findAll  =  (req, res)=>{
    var locale = (JSON.stringify(req.headers['locale']))
    var file = ''
    if(locale ==='en'){
      file = 'home_en.json'
    }else if(locale==='ar'){
      file = 'home_ar.json'
    }else{
      file = 'home_en.json'
    }
    fs.readFile(file, (err, data) => {
      if (err) throw err
      let homeData = JSON.parse(data)
      res.send(homeData)
  })
}
