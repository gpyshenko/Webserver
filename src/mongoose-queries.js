const { mongoose } = require('./../server/db/mongoose');
var { Todo } = require('./../server/models/todo');

var id = '5b51de99a5be1c1b148d8873';

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos)
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo)
});

Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log(`${id} not found`)
    }
    console.log('Todo By Id', todo);
});