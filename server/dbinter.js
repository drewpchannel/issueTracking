/* port 3454 x 33454
---work99
---work88 for user test 
*/

const pass = require('./password');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "10.16.35.193",
  user: "test",
  password: pass,
  port: "3306",
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
  return new Promise((resolve, reject) => {
    let queryTxt = `SELECT * FROM userlogins WHERE name = '${nameRec}';`;
    con.query(queryTxt, (err, result) => {
      let x = Object.keys(result).length;
      if (err) throw err;
      if (x >= 1) {
        if (result[0].password === passRec) {
          resolve(x);
        } else {
          resolve('invalid password');
        }
      } else {
        createUser(nameRec, passRec);
        resolve("created");
      }
    })
  })
}
//check incoming for symbols, double check sql injections

function deleteTicket(username, id) {
  return new Promise((resolve, reject) => {
    if(!username) {
      console.log('username not found, not deleting');
      resolve('username undefined in delete')
    } else {
      const sql = `DELETE FROM ${username} WHERE id = '${id}' LIMIT 1;`
      con.query(sql, (err,result) => {
        if (err) throw err;
        resolve('done');
      })
    }
  }) 
}

function changeTicket(username, id, changeText) {
  return new Promise((res, rej) => {
    if (username && id && changeText) {
      const sql = `UPDATE ${username} SET abody='${changeText}' WHERE id='${id}'`
      con.query(sql, (err, result) => {
        if (err) throw err;
        res('done');
      })
    } else {
      res('usr id or text undefined');
    }
  })
}

module.exports = {checkUserInfo, deleteTicket, changeTicket}