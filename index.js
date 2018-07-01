const PORT = process.env.PORT || 5000;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.static('public'));

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// var tradeList = [];
var tradeList = require('./mock.json');

// POST:
app.post('/api/trademsg', function(req, res) {
  
  var t = req.body;

  tradeList.push(t);
  res.send(JSON.stringify(t, null, 2));
});

// GET:
app.get('/api/trademsg', function(req, res) {
  res.send(JSON.stringify(tradeList, null, 2));
});

app.listen(PORT);
