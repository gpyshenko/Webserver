const { ObjectID } = require('mongodb');
var { User } = require('../models/user');
var {authenticate} = require('../middleware/authenticate');


module.exports = function (app) {

    app.post('/users', (req, res) => {
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            password: req.body.password
        });

        user.save().then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
        }).catch((err) => {
            res.status(400).send(err);
        })
    });

    app.get('/users/me', authenticate, (req,res) => {
        res.send(req.user);
    });

    app.post('/users/login', (req,res) => {
        User.findByCredentials(req.body.email, req.body.password).then((user) => {
            return user.generateAuthToken().then((token) => {
                res.header('x-auth', token).send(user);
            })
        }).catch((err) => {
            res.status(400).send();
        });
    });

    app.get('/users', (req, res) => {
        User.find().then((users) => {
            res.render('users.pug', {
                pageTitle: 'Users Page',
                users: users
            })
        }, (e) => {
            res.status(400).send(e);
        })
    });

    app.get('/db/users', (req, res) => {
        User.find().then((users) => {
            res.send({ users });
        }, (e) => {
            res.status(400).send(e);
        })
    });

    app.get('/users/:id', (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
        User.findById(id).then((user) => {
            if (!user) {
                return res.status(404).send();
            }

            //res.send({ user });
            res.render('user.pug', {
                pageTitle: 'User Page',
                user: user
            })

        }).catch((err) => {
            res.status(400).send();
        })

    });

    app.get('/db/users/:id', (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
        User.findById(id).then((user) => {
            if (!user) {
                return res.status(404).send();
            }

            res.send({ user });

        }).catch((err) => {
            res.status(400).send();
        })

    });

}