'use strict'

var mysql = require('mysql');

// Connect to database
const CONNECTION = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harkka'
});

module.exports = 
{
    // Fetch all data from users table "/users/all"
    fetchAll: (req, res) => {
        CONNECTION.query('SELECT * FROM users', (err, result, fields) => {
            if(err) {
                console.log("Error while trying to get all data from users-table, reason: " + err);
                res.status(500).json({'status': 'not ok', 'status_text: ': err.sqlMessage });
            } else {
                console.log("Succesfully fetched all data from users table, time: "+time());
                res.status(200).json(result);
            }
        });
    },
    // Fetch user and password from user table "/users/:tunnus"
    fetchOneUser: (req, res) => {
        var username = req.params.tunnus;
        CONNECTION.query('SELECT * FROM users WHERE username = ?', [username],
            (error, result, fields) => {
                if(error) {
                    console.log("Error while fetching user and password from user table, reason: " + error);
                    res.json({"status": 500, "error": error, "response": null});
                } else {
                    console.log("Succesfully fetched user from user table, "+time());
                    res.status(200).json(result);
                }
            }
        );
    },

    fetchWorkorders: (req, res) => {
        let user = req.params.username;
        CONNECTION.query('SELECT * FROM workorders WHERE order_username=?', [user], 
            (error, results, fields) => {
                if(error) {
                    console.log("Error while fetching user and password from user table, reason: " + error);
                    res.json({"status": 500, "error": error, "response": null});
                } else {
                    console.log("Succesfully fetched workorders for " + user + ", "+time());
                    res.status(200).json(results);
                }
            }
        );
    },

    createUser: (req, res) => {
        console.log("Body: " + JSON.stringify(req.body));
        let v = req.body;

        CONNECTION.query('INSERT INTO users (username, password, name, visiting_address, role) VALUES (?, ?, ?, ?, ?)', [v.username_reg, v.password_reg, v.name_reg, v.address_reg, v.select_reg],
            (err, results, fields) => {
                if(err) {
                    console.log("Error while tried to add new user to users table, reason: "+err);
                    res.json(error);
                } else {
                    console.log("New user added to table users: "+JSON.stringify(results));
                    res.statusCode = 201;
                }
            }
        );
    }
}

// Sets time when data have been fetch from server or set to database
function time() {
    var current = new Date();
    if(current.getMinutes() > 9 && current.getSeconds() > 9)
        return current.getDate()+"."+(current.getMonth()+1)+"."+current.getFullYear()+" "+current.getHours()+":"+current.getMinutes()+"."+current.getSeconds();
    else if(current.getMinutes() < 10 && current.getSeconds() > 9)
        return current.getDate()+"."+(current.getMonth()+1)+"."+current.getFullYear()+" "+current.getHours()+":0"+current.getMinutes()+"."+current.getSeconds();
    else if(current.getMinutes() > 9 && current.getSeconds() < 10)
        return current.getDate()+"."+(current.getMonth()+1)+"."+current.getFullYear()+" "+current.getHours()+":"+current.getMinutes()+".0"+current.getSeconds();

}