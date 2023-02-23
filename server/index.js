const express = require("express");
const cors = require('cors');
const dbinter = require('./dbinter');
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

app.post("/createuser", (req, res) => {
  console.log(req.body.user[0].name);
  console.log('sending new user data...');
  dbinter.createUser(req.body.user[0].name, req.body.user[0].password);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});