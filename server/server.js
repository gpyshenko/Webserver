const express = require('express');
const fs = require('fs');
const _ = require('lodash');
const cors = require('cors');
const bodyParser = require('body-parser');

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

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.pug', {
        pageTitle: 'Home Page'
    })
}); 

app.get('/contacts', (req,res) => {
    res.render('contacts.pug', {
        pageTitle: 'Контакты'
    })
})

app.get('/contacts/:id', (req, res) => {
    res.render('contacts.pug', {
        pageTitle: 'Контакты',
        office: req.params.id
    })
})

app.post('/contacts/submit', (req, res) => {
    var id = req.body.id;
    res.redirect('/contacts/' + id)
})

app.listen(3000, () => {
    console.log(`Started on port 3000`);
});