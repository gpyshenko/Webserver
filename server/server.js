const _ = require('lodash');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');

var app = express();

app.use(bodyParser.json());
app.use(cors());

var routesUsers = require('./routes/users')(app);
var routesTodos = require('./routes/todos')(app);

app.listen(3000, () => {
    console.log('Started on port 3000');
});