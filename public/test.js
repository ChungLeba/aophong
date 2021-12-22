/* require('dotenv').config()
var jwt = require('jsonwebtoken');

var token = jwt.sign({foo: 'bar' }, process.env.LOGINJWT, {expiresIn: "1h"});

console.log(token)


jwt.verify(token, 'process.env.LOGINJWT', function(err, data){
    if(err){
        //console.log(err)
    } else {
        //console.log("data: ",data)
    }
}) */



/* console.log(process.env.DB_USERNAME, process.env.DB_PWD)
console.log('Port sử dụng là ' + process.env.PORT) */

/* // crypto module
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

// protected data
const message = "This is a secret message";

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// the cipher function
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

// encrypt the message
// input encoding
// output encoding
let encryptedData = cipher.update(message, "utf-8", "hex");

encryptedData += cipher.final("hex");

console.log("Encrypted message: " + encryptedData);

// the decipher function
const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

decryptedData += decipher.final("utf8");

console.log("Decrypted message: " + decryptedData);
 */

const crypto = require("crypto")
//const salt = crypto.randomBytes(32).toString('hex')
const salt = '719949e72667078d571f76117b670277ceb76aafda21c4e8d82408eb733568bc'

const key = crypto.pbkdf2Sync('456', salt, 2000, 64,'sha512')

//console.log(salt)
console.log('key chuẩn:'+ key.toString('hex'))

