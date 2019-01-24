const express = require('express');
const bodyParser = require('body-parser');
const Jwt = require('./jwt'), jwt = new Jwt("secret");
const bcrypt = require('bcrypt');
const config = require('./config.json');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require('mysql')
var connection = mysql.createConnection(config.db);
connection.connect()

// let hash = bcrypt.hashSync('12345', 2);

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    connection.query('SELECT * FROM users WHERE username = ? AND status = 1', [username], function (err, rows, fields) {
        if (err) throw err
        var user = false;
        if (rows.length == 1) {
            user = rows[0];
            if (user && bcrypt.compareSync(password, user.password)) {
                let token = jwt.encode({ id: user.id, username: user.username })
                res.json({
                    sucess: true,
                    err: null,
                    token
                });
                return;
            }
        }
        else {
            res.status(401).json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect'
            });
            return;
        }
        
    });
    return;
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Magic happens on port ${PORT}`);
});