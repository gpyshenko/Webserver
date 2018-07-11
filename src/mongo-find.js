// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

MongoClient.connect(url, (err, client) => {
    if (err) {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // db.collection('Todos').find({ 
    //     _id: new ObjectID('5b45ec52a0d7bd29c8e7eb1a')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count:${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // });

    db.collection('Users').find({name: 'George'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err)
    });
 
    client.close();
})