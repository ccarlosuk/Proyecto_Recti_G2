const jwt = require("jsonwebtoken");
require('dotenv').config({path: '../.env'})

const TOKEN_SECRET = process.env.TOKEN_SECRET;

//FUNCION PARA FIRMAR EL TOKEN CREADO USANDO
// USUARIO (ID, NOMBRE) Y TOKEN SECRETO
async function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET, {expiresIn: "1d"}, (err, token) => {
                if(err){
                    reject(err);
                }
            resolve(token);
        });
    });
}
module.exports = createAccessToken;