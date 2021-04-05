const path = require('path');
const fs = require('fs');
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const body = require('./body.json');

const app = express();

const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));

router.post('/add-user', (req, res, next) => {
  body.users.push(req.body.username);
  fs.writeFileSync('body.json', JSON.stringify(body, null, 2));
});

router.get('/users', (req, res, next) => res.send(body));

app.use(bodyParser.json());
app.use('/.netlify/functions/index', router);

module.exports = app;
module.exports.handler = serverless(app);
