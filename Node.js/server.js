var express = require('express');
var bodyParser = require('body-parser');
var controller = require('./controller');
var port = 3001;
var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//REST API Users
app.route("/users/all")
    .get(controller.fetchAll);

app.route("/users/:tunnus")
    .get(controller.fetchOneUser);

app.route("/create_user")
    .post(controller.createUser);

app.route("/workorders/:username")
    .get(controller.fetchWorkorders);


app.listen(port, () => {
    console.log("Server is running at port "+port);
});