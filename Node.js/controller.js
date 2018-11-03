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
    // Fetch user and password from user table "/users/:tunnus/:salasana"
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

    addUser: (req, res) => {
        console.log("Body: " + JSON.stringify(req.body));
        let v = req.body;

        CONNECTION.query('INSERT INTO users (username, password, name, address, city, role) VALUES (?, ?, ?, ?, ?, ?)', [v.username_reg, v.password_reg, v.name_reg, v.address_reg, v.city_reg, v.select_reg],
            (err, results, fields) => {
                if(err) {
                    console.log("Virhe lisättäessä käyttäjää user-tauluun, syy: "+err);
                    res.json(error);
                } else {
                    console.log("Uusi käyttäjä lisätty users-pöytään: "+JSON.stringify(results));
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