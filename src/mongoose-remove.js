const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// })

// Todo.findOneAndRemove({ _id: '5b571dd72d782313ed7ce807' }).then((todo) => {
//     console.log(todo);
// });

Todo.findByIdAndRemove('5b571dd72d782313ed7ce807').then((todo) => {
    console.log(todo);
});