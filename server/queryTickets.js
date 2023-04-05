var mysql = require('mysql');
const pass = require('./password');

var con = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: pass,
  port: "3306",
  database: "users"
});

function addTicket(username, from, subject, body) {
	const sql = `show tables like '${username}'`;
	con.query(sql, (err, result) => {
	  if (err) throw err;
	  if (result.length === 0) {
	  	console.log('no table found');
	  } else {
	  	//add id as timestamp
	  	const sql = `INSERT INTO ${username} (afrom, asubject, abody) VALUES (${from}, ${subject}, ${body})`;
	  	con.query(sql, (err, result) => {
	  	  if (err) throw err;
	  	  console.log('entered new ticket');
	  	});
	  }
	});
}

function checkForTable(username) {
	return new Promise ((resolve, reject) => {
		const sql = `show tables like '${username}'`;
		con.query(sql, (err, result) => {
		  if (err) throw err;
		  if (result.length === 0) {
		    console.log('Table not found for ' + username + ', creating...');
		    tableSQL = `CREATE TABLE ${username} (id VARCHAR(100), afrom VARCHAR(100), asubject VARCHAR(100), abody VARCHAR(600))`;
		    con.query(tableSQL, (err, result) => {
		    	//removed throw error, react dev running this twice and causing sql to report an error for table existing
		      resolve();
		    });
		  } else {
		    console.log('found user\'s table');
		    resolve();
		  }
		});
	});
}

async function getTickets(username) {
	let x = await checkForTable(username);
	return new Promise ((resolve, reject) => {
		const sql = `select * from ${username}`;
		con.query(sql, (err, result) => {
		  if (err) throw err;
		  resolve(result);
		});
	})
}

module.exports = {getTickets, addTicket}