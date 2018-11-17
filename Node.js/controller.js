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

    // Fetch housing types
    fetchHousingTypes: (req, res) => {
        CONNECTION.query('SELECT * FROM housing_types', 
            (error, result, fields) => {
                if(error) {
                    console.log("Error while trying to fetch housing types from housing_types-table, reason: "+error);
                    res.json({"status": 500, "error": error, "response": null});
                } else {
                    console.log("Succesfully fetched housing types, "+time());
                    res.status(200).json(result);
                }
            }
        );
    },

    // Fetch all workorders
    fetchWorkorders: (req, res) => {
        let user = req.params.username;
        CONNECTION.query('SELECT w.id, w.order_username, w.work_description, w.orderdate, w.startdate, w.readydate, w.accepteddate, w.denieddate, w.comment_of_work, w.hours, w.approx_budget, s.status FROM workorders w LEFT JOIN states s ON w.status = s.id WHERE w.order_username=?', [user], 
            (error, results, fields) => {
                if(error) {
                    console.log("Error while fetching workorders from workorders table, reason: " + error);
                    res.json({"status": 500, "error": error, "response": null});
                } else {
                    console.log("Succesfully fetched workorders for " + user + ", "+time());
                    res.status(200).json(results);
                }
            }
        );
    },

    // Creates user
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
    },

    // Updates user
    updateUser: (req, res) => {
        console.log("body: " + JSON.stringify(req.body));
        console.log("params: " + JSON.stringify(req.params));
        let c = req.body; // Form fields
        let key = req.params.tunnus; // Username
  
        CONNECTION.query('UPDATE users SET name=?, username=?, visiting_address=?, billing_address=?, phonenumber=?, email=?, house_squares=?, building_ground=?, housing=? WHERE username=?', [c.name_reg, c.username_reg, c.visitingaddress_reg, c.billingaddress_reg, c.phonenumber_reg, c.email_reg, c.house_squares, c.building_ground, c.housing_select, key],
          function(error, results, fields){
            if ( error ){
                console.log("Error while trying to update "+key+" in users table, reason: " + error);
                res.send(error);
            }
            else
            {
                console.log("Data updated for user "+key+", "+time());
                res.statusCode = 204;
                res.send();
            }
          }
        );
    },

    // Deletes workorder
    deleteWorkorder: (req, res) => {
        let c = req.body;
        let key = req.params.username;

        CONNECTION.query('DELETE FROM workorders WHERE id=?', [key], 
            (error, results, fields) => {
                if(error) {
                    console.log("Error while trying to delete data from workorders-table ,reason: "+error);
                    res.send(error);
                } else {
                    console.log("Data deleted from workorders table "+time());
                    res.statusCode = 204;
                    res.send();
                }
            }
        );
    },

    // Deletes user
    deleteUser: (req, res) => {
        let c = req.body;
        let key = req.params.tunnus;

        CONNECTION.query('DELETE FROM users WHERE username=?', [key], 
            (error, results, fields) => {
                if(error) {
                    console.log("Error while trying to delete data from users-table, reason: "+error);
                    res.send(error);
                } else {
                    console.log("Data deleted for user '"+key+"' in users table "+time());
                    res.statusCode = 204;
                    res.send();
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