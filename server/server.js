const express = require('express');
//const hbs = require('hbs');
const fs = require('fs');
const _ = require('lodash');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();

// Use
app.use(bodyParser.json());
app.use(cors());

var { mongoose } = require('./db/mongoose');

// Роуты
var routesUsers = require('./routes/users')(app);
var routesTodos = require('./routes/todos')(app);

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.pug', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Website'
    })
}); 

app.listen(3000, () => {
    console.log('Started on port 3000');
});