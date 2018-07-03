const PORT = process.env.PORT || 5000;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const jsonschema = require('jsonschema');
const validator = new jsonschema.Validator();
const schema = require('./schema.json');
const app = express();
let tradeList = [];

app.use(express.static('public'));
// let validator = require('./validateJson');

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  if (err) {
    return res.status(err.status).send('Invalid Request data')
  } else {
    next()
  }
})

// POST
app.post('/api/trademsg', function (req, res) {
  let t = req.body;

  let errors = validator.validate(t, schema).errors;
  if (errors.length > 0) {
    return res.status(400).send(JSON.stringify(errors, null, 2));
  }

  tradeList.push(t);
  res.send(JSON.stringify(t, null, 2));
});

// GET
app.get('/api/trademsg', function (req, res) {
  res.send(JSON.stringify(tradeList, null, 2));
});

// GET: Reset
app.get('/api/reset', function (req, res) {
  tradeList = [];
  res.send("Data reset");
});

app.listen(PORT);