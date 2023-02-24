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
  port: "3454",
  database: "users"
});

//may need to do encryption on both ends in future
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function createUser(nameRec, passRec) { 
  if (nameRec && passRec) {
    let sql = `INSERT INTO userlogins (name, password) VALUES ('${nameRec}', '${passRec}')`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("creating user: " + nameRec);
    });
  } else {
    console.log('name still null');
  }
}

function checkUserInfo(nameRec, passRec) {
  let checkForUser = `SELECT * FROM userlogins WHERE name = '${nameRec}';`;
  con.query(checkForUser, (err, result) => {
    console.log(Object.keys(result).length);
    //result is 6, should not return true but it is...
    if (err) throw err;
    if (Object.keys(result).length === 0) {
      createUser(nameRec, passRec);
    } else {
      //enter login info and function
      console.log('trying to say false')
    }
  });
}

function getCreds(userName, passWord) {
    console.log(pass.getPass());
}

//check incoming for symbols, double check sql injections

module.exports = {getCreds, checkUserInfo}