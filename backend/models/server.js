const express = require("express");
const cors = require("cors");
const path = require("path");
const dbConnection = require("../database/dbConnection");



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.loginRoutePath = '/login';

        //CONECTAR A LA BASE DE DATOS
        this.conectarDB();

        //MIDDLEWARES
        this.middlewares();

        //RUTAS DE MI APLICACIÓN
        this.routes();
    }

    async conectarDB(){
        await dbConnection;
    }

    middlewares(){
        //CORS
        this.app.use( cors() );

        //LECTURA Y PARSEO DEL BODY
        this.app.use( express.json() );

        //Directorio público '/'
        this.app.use( express.static('./public') );
        //this.app.use(  express.static(path.join(__dirname, '../public')) );
    }

    //ROUTES = RUTAS
    routes(){
        this.app.use(this.loginRoutePath,require('../routes/login.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${this.port}`)
        });
    }
}

module.exports = Server;