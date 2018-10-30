var express = require('express');
var app = express();
var controller = require('./controller');
var port = 3001;

//CORS middleware (NodePohjasta, kertaustehtävät)cmd

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// REST API Users
app.route('/users/all')
    .get(controller.fetchAll);

app.route('/users/:tunnus/:salasana')
    .get(controller.fetchOneUser);


// This let server run and listen
app.listen(port);
console.log("Server is running on port "+port);