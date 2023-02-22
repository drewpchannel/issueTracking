const express = require("express");
const cors = require('cors');
const dbinter= require('./dbinter');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.get("/api", (req, res) => {
  console.log('got req for api');
  res.json({message: "Hello"});
});

app.post("/createuser", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});