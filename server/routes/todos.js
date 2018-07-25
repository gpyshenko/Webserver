const _ = require('lodash');
const { ObjectID } = require('mongodb');

var { Todo } = require('../models/todo');

module.exports = function (app) {
    app.post('/todos', (req, res) => {
        var todo = new Todo({
            text: req.body.text,
            difficult: req.body.difficult,
            completed: req.body.completed
        });

        todo.save().then((doc) => {
            res.send(doc);
        }, (e) => {
            res.staus(400).send(e);
        });
    });

    app.get('/todos', (req, res) => {
        Todo.find().then((todos) => {
            res.send({ todos });
        }, (e) => {
            res.status(400).send(e);
        })
    });

    app.get('/todos/:id', (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
        Todo.findById(id).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({ todo });

        }).catch((err) => {
            res.status(400).send();
        })

    });

    app.delete('/todos/:id', (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        Todo.findByIdAndRemove(id).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send(todo);
        }).catch((err) => {
            res.status(400).send();
        });
    });

    app.patch('/todos/:id', (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['text', 'completed']);
        //var body =  { text, completed} = req.body;
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        }).catch((err) => {
            res.status(400).send();
        })
    })
}