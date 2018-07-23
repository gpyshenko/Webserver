const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

var id = '5b51de99a5be1c1b148d8873';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos)
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo)
// });

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log(`${id} not found`)
    }
    console.log('Todo By Id', todo);
}).catch((e) => console.log(e));

User.findById('5b508d8970903e0154e83eb8').then((user) => {
    if(!user) {
        return console.log('asd')
    }
    console.log(JSON.stringify(user,undefined, 2))
}, (e) => {
    console.log(e)
})