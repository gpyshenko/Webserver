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
    db.collection('Users').findOneAndUpdate({
        name: 'Violetta'
    }, {
        $inc: {
            age: -4
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    })

    client.close();
})