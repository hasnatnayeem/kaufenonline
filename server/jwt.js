var crypto = require('crypto');

module.exports = function(key) {
    this.key = key; 
    
    function encodeBase64(str) {
        return new Buffer.from(str).toString('base64').toString("utf-8");
    }

    function decodeBase64(str) {
        return new Buffer.from(str, 'base64').toString("utf-8");
    }
    
    function stringify(obj) {
        // Turns object into plain text
        return JSON.stringify(obj);
    }

    function generateChecksum(head, body) {
        var checkSumStr = head + "." + body; 
        var hash = crypto.createHmac('sha256',key);
        var checkSum = hash.update(checkSumStr)
                .digest('base64').toString('utf8');
        return checkSum;
    }

    var alg = {"alg": "HS256", "typ": "JWT"};

    return {
        encode:(obj) => {
            var result = "";
            var header = encodeBase64(stringify(alg)); // First part of token
            result += header + ".";
            var body = encodeBase64(stringify(obj));
            result += body + "."; // Second part of token

            var checkSum = generateChecksum(header,body); // Third part of token
            result += checkSum; 
            return result;
        },
        decode:(str) => {
            var jwtArr = str.split("."); 
            var head = jwtArr[0];
            var body = jwtArr[1];
            var hash = jwtArr[2];
            var checkSum = generateChecksum(head,body); 

            if(hash === checkSum) {
                return JSON.parse(decodeBase64(body));
            } else {
                return false;
            }
        }
    };
};

