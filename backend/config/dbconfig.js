const mysql = require("mysql")

//CREACIÓN DE LA CONEXIÓN A LA BD
const db =  mysql.createConnection({
    host:'34.176.134.58',
    database:'proyectorecti',
    user:'root',
    password: '1234',
});

db.connect((err) => {
    if (err) {
        console.error("Conexion error");
        throw err;
    }
    console.log("Conexion exitosa");
});
module.exports = db;