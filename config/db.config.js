const mysql = require('mysql');

 /* const dbConn = mysql.createPool({
  connectionLimit: 100, //important
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mazola_admin',
  debug: false
});   */ 
 /**/
//Create db connection
/* const dbConn = mysql.createConnection({
  host     : 'eu-cdbr-west-01.cleardb.com',
  user     : 'b8235e3a8f8a1a',
  password : '635fd4be',
  database : 'heroku_c449ea1974c8140'
}); */

const dbConn = mysql.createPool({
  connectionLimit: 100, //important
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  debug: false
});     
dbConn.getConnection(function (err, connection) {
  if (err) throw err;
  console.log("Database Connected!");
})
module.exports = dbConn