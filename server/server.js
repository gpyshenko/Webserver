const express = require('express');
const fs = require('fs');
const _ = require('lodash');
const cors = require('cors');
const bodyParser = require('body-parser');
var path = require('path');

var param = process.argv[2];
var app = express();

// Use
app.use(bodyParser.json());
app.use(cors());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))

// Подключение базы данных в приложение
var { mongoose } = require('./db/mongoose');

// Роуты
var routesUsers = require('./routes/users')(app);
var routesTodos = require('./routes/todos')(app);

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "../views"));

app.use('/static', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    //console.log(req.acceptsLanguages);
    res.render('index.pug', {
        pageTitle: 'Home Page'
    })
}); 
 
app.get('/contacts', (req,res) => {
    res.render('contacts.pug', {
        pageTitle: 'Контакты'
    })
});

app.get('/contacts/:id', (req, res) => {
    res.render('contacts.pug', {
        pageTitle: 'Контакты',
        office: req.params.id
    })
});

app.post('/contacts/submit', (req, res) => {
    var id = req.body.id;
    res.redirect('/contacts/' + id)
});

app.use(function(req,res,next) {
    res.status(404);
    res.render('404.pug', {
        pageTitle: 'Страница 404'
    })
});

app.use(function (err,req,res,next) {
    console.log(err.stack);
    res.status(500);
    res.render('500.pug')
});

app.listen(3000, () => {
    console.log(`Started on port 3000`);
});