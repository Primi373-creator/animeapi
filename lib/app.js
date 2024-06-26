// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var connectionString = process.env.CONNECTION_STRING || 'mongodb+srv://api:api@api.pldyojn.mongodb.net/?retryWrites=true&w=majority&appName=api';
mongoose.connect(connectionString);

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api.js'));

app.get('/', function(req, res) {
    res.send('hello world use /api');
});

// Start server
var port = process.env.SERVER_PORT || 3900;
app.listen(port);
console.log('API is runing on port ' + port);
