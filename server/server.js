const express = require('express');
const hbs = require('hbs');
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

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
 

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Website'
    })
});



app.listen(3000, () => {
    console.log('Started on port 3000');
});