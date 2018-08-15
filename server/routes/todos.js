const _ = require('lodash');
const { ObjectID } = require('mongodb');
var { authenticate } = require('../middleware/authenticate');
var { Todo } = require('../models/todo');

module.exports = function (app) {
    app.post('/todos', authenticate, (req, res) => {
        var todo = new Todo({
            text: req.body.text,
            _creator: req.user._id,
        });

        todo.save().then((doc) => {
            res.send(doc);
        }, (e) => {
            res.staus(400).send(e);
        });
    });

    app.get('/todos', authenticate, (req, res) => {
        Todo.find({
            _creator: req.user._id
        }).then((todos) => {
            res.send({ todos });
        }, (e) => {
            res.status(400).send(e);
        })
    });

    app.get('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
        Todo.findOne({
            _id: id,
            _creator: req.user._id
        }).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({ todo });

        }).catch((err) => {
            res.status(400).send();
        })

    });

    app.delete('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        }).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send(todo);
        }).catch((err) => {
            res.status(400).send();
        });
    });

    app.patch('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['text', 'completed']);
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findOneAndUpdate({
            _id: id,
            _creator: req.user._id
        }, { $set: body }, { new: true }).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        }).catch((err) => {
            res.status(400).send();
        })
    })
}