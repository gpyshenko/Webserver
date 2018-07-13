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

    // deleteMany
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5b45ec52a0d7bd29c8e7eb1a')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    })

    client.close();
})