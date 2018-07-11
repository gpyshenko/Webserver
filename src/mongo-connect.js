// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

MongoClient.connect(url, (err, client) => {
    if(err) {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("Unable to insert todo", err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    db.collection('Users').insertOne({
        name: 'George',
        age: 23,
        location: 'Tashkent'
    }, (err, result) => {
        if (err) {
            return console.log("Unable to insert user", err);
        }

        console.log(result.ops[0]._id.getTimestamp());
    })

    client.close();
})