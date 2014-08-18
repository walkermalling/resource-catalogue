/*jslint node: true */
'use strict';

// framework
var express = require('express');

// http://nodejs.org/api/http.html#http_http
var http = require('http');

// middleware: request parser (https://github.com/senchalabs/connect#middleware)
var bodyparser = require('body-parser');

// object modeling for mongodb
var mongoose = require('mongoose');

// ---------------------------------

var app = express(); // initialize express

mongoose.connect( process.env.MONGO_URL || 'mongodb://localhost/resource-catalogue' );

app.use(bodyparser.json());
require('./routes/routes')(app);

var server = http.createServer(app);

app.set('port', process.env.PORT || 3000 );

server.listen(app.get('port'), function() {
  console.log('Server running on :3000');
});
