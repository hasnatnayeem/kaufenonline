const express = require('express');
const bodyParser = require('body-parser');
const Jwt = require('./jwt'), jwt = new Jwt("secret");
const bcrypt = require('bcrypt');
const config = require('./config.json');
const saltRounds = 2;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require('mysql')
var connection = mysql.createConnection(config.db);
connection.connect()


app.post('/login', (req, res) => {
    let user = req.body;

    connection.query('SELECT username, password, email, first_name, last_name, phone FROM users WHERE username = ? AND status = 1', [user.username], function (err, rows, fields) {
        if (err) throw err
        if (!rows.length || !bcrypt.compareSync(user.password, rows[0].password)) {
            res.status(401).json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect'
            });
            return;
        }
        else {
            user = rows[0];
            delete user.password; 
            let token = jwt.encode({ id: user.id, username: user.username })
            res.json({
                sucess: true,
                err: null,
                token: token,
                user: user
            });
            return;
        }

    });
    return;
});

app.post('/register', (req, res) => {
    var user = req.body;
    connection.query('SELECT * FROM users WHERE username = ?', [user.username], function (err, rows, fields) {
        if (err) throw err
        if (rows.length == 1) {
            res.json({
                sucess: false,
                err: "username_exists",
                message: "Username exists"
            });
            return;
        }
        user.password = bcrypt.hashSync(user.password, saltRounds);
        connection.query("INSERT INTO users (username, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
            [user.username, user.password, user.email, user.first_name, user.last_name], function (err, result) {
                if (err) throw err
                console.log(result)
                if (result) {
                    res.json({
                        sucess: true,
                        err: null,
                        message: "Registered successfully"
                    });
                    return;
                }
                else {
                    res.status(401).json({
                        sucess: false,
                        token: null,
                        err: 'An error occurred'
                    });
                    return;
                }
            });

    });


    return;
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Magic happens on port ${PORT}`);
});