const express = require('express');

var app = express();

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.send({
        name: 'Георгий',
        likes: [
            'Sport',
            'Smartphones'
        ]
    })
});

app.get('/about', (req,res)=> {
    res.send('About Page')
})

app.listen(3000);