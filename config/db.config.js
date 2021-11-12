const mysql = require('mysql');

//Create db connection
/* const dbConn = mysql.createConnection({
  host     : 'eu-cdbr-west-01.cleardb.com',
  user     : 'b8235e3a8f8a1a',
  password : '635fd4be',
  database : 'heroku_c449ea1974c8140'
}); */

const dbConn = mysql.createPool({
  connectionLimit : 100, //important
  host     : 'us-cdbr-east-04.cleardb.com',
  user     : 'b62bbe69043494',
  password : 'b6a49552',
  database : 'heroku_b92fbf819f2124c',
  debug    :  false
});

/* dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
}); */

dbConn.getConnection(function(err, connection) {
  if (err) throw err; 
  console.log("Database Connected!" +connection);
})
module.exports = dbConn