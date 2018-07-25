

app.use(express.static(__dirname + '/public'));



app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Website'
    })
});

app.get('/about', (req,res)=> {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.listen(3000, ()=> {
    console.log('Сервер запущен на 3000 порту.')
});