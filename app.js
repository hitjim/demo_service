const express = require('express');
const app = express();

const mongoClient = require('mongodb').MongoClient;
const mongoID = require('mongodb').ObjectID;

const fs = require('fs');

var db;

fs.readFile("mongoConnectionString.txt", 'utf8', function(err, mongoConnectionString) {
    if (err) return console.log(err);

    mongoClient.connect(mongoConnectionString, (err, database) => {
        
        if (err) return console.log(err);
        
        db = database;
        console.log('connected to MongoDB');

        app.listen(8080, function() {
            console.log('listening on port 8080');
        });
    })
});

app.get('/', function(req, res) {
    res.send('Demo Service Works!');
})

app.get('/projects', (req, res) => {
    var cursor = db.collection('projects').find().toArray(function(err, results) {
        if (err) return console.log(err);
        res.send(results);
    })
})

app.get('/project/:id', (req, res) => {
    var query = {'_id': new mongoID.ObjectID(req.params.id)};

    db.collection('projects', function(err, collection) {
        if (err) return console.log(err);
        collection.findOne(query, function (err, item) {
            if (err) return console.log(err);
            res.send(item);
        });
    });
});

app.post('/project', (req, res) => {
    db.collection('projects').save(req.body, (err, result) => {
        if (err) return console.log(err)
        
        res.send("Hi");
    });
})