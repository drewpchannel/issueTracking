/* port 3454 x 33454
---work99
---work88 for user test 

*/
const pass = require('./password');

var mysql = require('mysql');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: pass.getPass()
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function getCreds (userName, passWord) {
    console.log(username, passWord)
}

module.export = {getCreds}