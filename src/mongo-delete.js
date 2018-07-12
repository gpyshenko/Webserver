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
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // })

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // })

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({ text: 'Eat lunch', completed: true }).then((result) => {
    //     console.log(result);
    // })

    //db.collection('Users').deleteMany({name: 'George'});
    // db.collection('Users').findOneAndDelete({ _id: new ObjectID('5b45ed48fc320215643c7a41')}).then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2)); 
    // })


    client.close();
})