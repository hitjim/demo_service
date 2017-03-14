const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
   
  next();
});

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

app.get('/customers', (req, res) => {
    var cursor = db.collection('customers').find().toArray(function(err, results) {
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

app.get('/customer/:id', (req, res) => {
    var query = {'_id': new mongoID.ObjectID(req.params.id)};

    db.collection('customers', function(err, collection) {
        if (err) return console.log(err);
        collection.findOne(query, function (err, item) {
            if (err) return console.log(err);
            res.send(item);
        });
    });
});

app.post('/project', (req, res) => {
    console.log(req.body);
    db.collection('projects').insert(req.body, (err, result) => {
        if (err) return console.log(err)
        res.send({"status": "success"});
    });
})

app.post('/customer', (req, res) => {
    console.log(req.body);
    db.collection('customers').insert(req.body, (err, result) => {
        if (err) return console.log(err)
        res.send({"status": "success"});
    });
})

app.put('/project', (req, res) => {
    var query = {'_id': mongoID.createFromHexString(req.body._id)};
    delete req.body._id;

    db.collection('projects').update(query, req.body, (err, result) => {
        if (err) return console.log(err)
        res.send({"status": "success"});
    });
})

app.put('/customer', (req, res) => {
    var query = {'_id': mongoID.createFromHexString(req.body._id)};
    delete req.body._id;

    db.collection('customers').update(query, req.body, (err, result) => {
        if (err) return console.log(err)
        res.send({"status": "success"});
    });
})

app.delete('/project/:id', (req, res) => {
    var query = {'_id': mongoID.createFromHexString(req.params.id)};
    delete req.body._id;

    db.collection('projects').remove(query, (err, result) => {
        if (err) return console.log(err)
        res.send({"status": "success"});
    });
})

app.delete('/customer/:id', (req, res) => {
    var query = {'_id': mongoID.createFromHexString(req.params.id)};
    delete req.body._id;

    db.collection('customers').remove(query, (err, result) => {
        if (err) return console.log(err)
        res.send({"status": "success"});
    });
})
