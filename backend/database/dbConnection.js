const mysql = require("mysql2");
const util = require("util");
require('dotenv').config({path:'../.env'}) //PARA QUE SE LEAN LAS VARIABLES DE ENTORNO EN LA RAIZ
//require('dotenv').config({path:'relative/path/to/your/.env'})

//CREACIÓN DE LA CONEXIÓN A LA BD
const dbConnection = mysql.createConnection({
            host: process.env.DB_HOST,//'34.176.134.58',
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD//process.env.DB_PASSWORD,//'1234',
});
dbConnection.connect((error) => {
    if (error) {
        return console.log(`${error.name}: ${error.message}`);
    }
    console.log(`Conexion exitosa a la base de datos!!`);
});

//cambia conexion.query a la sintaxis async await
const query = util.promisify(dbConnection.query).bind(dbConnection);
/*const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        dbConnection.query(sql, values, (error, results) => {
            if (error) {
                reject(`${error.name}: ${error.message}`);
            } else {
                resolve(results);
            }
        });
    });
};*/
module.exports = query;
