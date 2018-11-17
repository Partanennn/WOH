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
app.route("/users")
    .get(controller.fetchAll)
    .post(controller.createUser);

app.route("/users/:tunnus")
    .put(controller.updateUser)
    .delete(controller.deleteUser)
    .get(controller.fetchOneUser);
    
app.route("/workorders")
    .post(controller.createWorkorder);

app.route("/workorders/:username")
    .get(controller.fetchWorkorders)
    .delete(controller.deleteWorkorder);


app.route("/housing_types")
    .get(controller.fetchHousingTypes);

app.listen(port, () => {
    console.log("Server is running at port "+port);
});