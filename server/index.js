const express = require("express");
const cors = require('cors');
const dbinter = require('./dbinter');
const queryTickets = require('./queryTickets');
const ticketUpdater = require('./ticketUpdater');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.json({message: "Server Connected"});
});

app.post("/createuser", async (req, res) => {
  console.log('user login requested...');
  let x = await dbinter.checkUserInfo(req.body.user[0].name, req.body.user[0].password);
  res.send({dbRes: x});
});

//rename this to ticket posting
app.post("/updateTickets", async (req, res) => {
  console.log('ticket change attempt...');
  if (req.body.user[0].username) {
    if (req.body.user[0].file.ticket[0].id) {
      let x = await ticketUpdater.checkForTable(
        req.body.user[0].username, 
        req.body.user[0].file.ticket[0].id,
        req.body.user[0].file.ticket[0].afrom,
        req.body.user[0].file.ticket[0].asubject,
        req.body.user[0].file.ticket[0].abody
      );
    } else {
        let x = await ticketUpdater.checkForTable(req.body.user[0].username);
    }
    res.send({dbRes: req.body});
  } else {
    res.send({dbRes: "username not found"});
  }
});

app.post("/ticketCheck", async (req, res) => {
  if (req.body.user && req.body.user[0].username.length < 30) {
    if (req.body.user[0].username) {
      console.log('requesting tickets for ' + req.body.user[0].username);
      let x = await queryTickets.getTickets(req.body.user[0].username, req.body.user[0].id);
      res.send({dbRes: x});
    } else {
      res.send({dbRes: "username not found"});
    }
  } else {
    res.send({dbRes: "req.body.user invalid"})
  }
});

app.post("/ticketDelete", async (req,res) => {
  console.log('deleting ticket for... ' + req.body.username);
  let x = await dbinter.deleteTicket(req.body.username, req.body.id)
  .then(() => {
    res.send({dbRes: 'done deleting'})
  });
});

app.post("/ticketChange", async (req,res) => {
  let x = await dbinter.changeTicket(req.body.username, req.body.id, req.body.changeText);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});