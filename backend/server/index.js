/*
var Jwt = require('./jwt'),
jwt = new Jwt("secret");

aUser = {
    "id": 5,
    "name": "Nayeem2"
}

var aJwt = jwt.encode(aUser);
console.log(aJwt);
*/
// Bringing all the dependencies in
const express = require('express');
const bodyParser = require('body-parser');
const Jwt = require('./jwt'),
jwt = new Jwt("secret");

var app = express();

// See the react auth blog in which cors is required for access
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
//     next();
// });

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MOCKING DB just for test
let users = [
    {
        id: 1,
        username: 'test',
        password: 'asdf123'
    },
    {
        id: 2,
        username: 'test2',
        password: 'asdf12345'
    }
];


// LOGIN ROUTE
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body.username)
    // Use your DB ORM logic here to find user and compare password
    for (let user of users) { // I am using a simple array users which i made above
        if (username == user.username && password == user.password /* Use your password hash checking logic here !*/) {
            //If all credentials are correct do this
            let token = jwt.encode({ id: user.id, username: user.username })
            res.json({
                sucess: true,
                err: null,
                token
            });
            return;
        }
        else {
            res.status(401).json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect'
            });
            return;
        }
    }
});

// app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
//     res.send('You are authenticated'); //Sending some response when authenticated
// });


// Starting the app on PORT 3000
const PORT = 8080;
app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`Magic happens on port ${PORT}`);
});