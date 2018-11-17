'use strict';
var port = (process.env.PORT||8000);
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('./Config.js');
var server = express();
var mongoose = require('mongoose');

var dogDescription = require('./API/Models/dogDescription');

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl,{useNewUrlParser:true});

server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

var routes = require('./API/Routes/Routes');
routes(server);

server.listen((port),function(){
    console.log("Server is up and listening on port"+
    port);
});
