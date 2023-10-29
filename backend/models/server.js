const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require("path");
const dbConnection = require("../database/dbConnection");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.mainRoutePath = '/api';

        //CONECTAR A LA BASE DE DATOS
        this.conectarDB();

        //MIDDLEWARES
        this.middlewares();

        //RUTAS DE MI APLICACIÓN
        this.routes();
    }

    async conectarDB() {
        await dbConnection;
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //LECTURA Y PARSEO DEL BODY
        this.app.use( express.json() );
        //LECTURA Y PARSEO DE LAS COOKIES ENVIADAS DESDE EL CLIENTE
        this.app.use( cookieParser() );

        //Directorio público '/'
        this.app.use(express.static("./public"));
        //this.app.use(  express.static(path.join(__dirname, '../public')) );
    }

    //ROUTES = RUTAS
    routes(){
        //RUTA DE USUARIO
        this.app.use(this.mainRoutePath,require('../routes/usuario.routes'));
        //RUTA DE ESTUDIANTE
        this.app.use(this.mainRoutePath,require('../routes/estudiante.routes'));
        //RUTA DE DIRECTOR DE ESCUELA

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${this.port}`)
            console.log(`Environment: ${process.env.NODE_ENV}`)
        });
    }


}

module.exports = Server;
