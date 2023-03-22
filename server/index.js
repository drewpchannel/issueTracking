const express = require("express");
const cors = require('cors');
const dbinter = require('./dbinter');
const emailparser = require('./emailparser');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  console.log('got req for api');
  res.json({message: "Hello"});
});

app.post("/createuser", async (req, res) => {
  console.log('user login requested...');
  let x = await dbinter.checkUserInfo(req.body.user[0].name, req.body.user[0].password);
  res.send({dbRes: x});
});

app.post("/emailDrop", async (req, res) => {
  console.log('email dropped...');
  let x = await emailparser.checkForTable('drew');
  res.send({dbRes: 'placeholder'});
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});