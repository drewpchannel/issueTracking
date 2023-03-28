const express = require("express");
const cors = require('cors');
const dbinter = require('./dbinter');
const queryTickets = require('./queryTickets');
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

//rename this to ticket posting
app.post("/emailDrop", async (req, res) => {
  console.log('email drop');
  if (req.body.user[0].username) {
    let x = await emailparser.checkForTable(req.body.user[0].username);
    res.send({dbRes: req.body});
  } else {
    res.send({dbRes: "username not found"});
  }
});

app.post("/ticketCheck", async (req, res) => {
  if (req.body.user) {
    if (req.body.user[0].username) {
      console.log('requesting tickets for ' + req.body.user[0].username);
      //possibly change querytickets.gettickets to return a promise object
      let x = await queryTickets.getTickets(req.body.user[0].username);
      console.log('this is x: ' + x)
      res.send({dbRes: x});
    } else {
      res.send({dbRes: "username not found"});
    }
  } else {
    res.send({dbRes: "req.body.user invalid"})
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});