/* port 3454 x 33454
---work99
---work88 for user test 

*/
const pass = require('./password');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: pass.getPass(),
  port: "3454"
});

//may need to do encryption on both ends in future
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function createUser (nameRec, passRec) { 
  if (nameRec && passRec) {
    let sql = `INSERT INTO userlogins (name, password) VALUES (${nameRec, passRec})`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("creating user: " + nameRec);
    });
  } else {
    console.log('name still null');
  }
}

function getCreds (userName, passWord) {
    console.log(pass.getPass());
}

//check incoming for symbols, double check sql injections

module.export = {getCreds, createUser}