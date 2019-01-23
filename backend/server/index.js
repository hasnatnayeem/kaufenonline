var Jwt = require('./jwt'),
jwt = new Jwt("secret");

aUser = {
    "id": 5,
    "name": "Nayeem2"
}

var aJwt = jwt.encode(aUser);
console.log(aJwt);