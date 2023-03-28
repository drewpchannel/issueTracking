const pass = require('./password');
var mysql = require('mysql');
const fs = require('fs');

var con = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: pass.getPass(),
  port: "3306",
  database: "users"
});

//may need to do encryption on both ends in future
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function checkForTable(username) {
  const sql = `show tables like '${username}'`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      console.log('Table not found for ' + username + ', creating...');
      tableSQL = `CREATE TABLE ${username} (aid VARCHAR(100), afrom VARCHAR(100), asubject VARCHAR(100), abody VARCHAR(600))`;
      con.query(tableSQL, (err, result) => {
        if (err) throw err;
        console.log('new user table create runs');
      });
    } else {
      console.log('found user\'s table');
    }
  });
}

module.exports = {checkForTable}