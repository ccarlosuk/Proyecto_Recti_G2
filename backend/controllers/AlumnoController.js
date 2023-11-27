const debug = require("debug")("app:module-users-controller");

const alumnoModel = require("../models/AlumnoModel");
const { response, request } = require("express");
const usuarioModel = require("../models/UsuarioModel");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../lib/jwt");
const fs = require("fs");
const XLSX = require('xlsx');
const { retiroFormato, ingresoFormato } = require("../helpers/metodosTranformar");
const { RectiRetiros, RectiIngresos } = require("../helpers/metodosRectificacion");

const AlumnoController = {
    //GET
    getAlumno: async (req = request, res = response) => {
        try {
            //const { id } = req.params;
            const id = req.query.id;
            console.log(id);
            const alumno = await alumnoModel.getById(id);
            console.log(alumno);

            if (!alumno || alumno.length === 0) {
                return res.status(404).json("Alumno no existe");
            } else {
                return res.status(200).json({
                    id,
                    alumno,
                });
            }
        } catch (error) {
            debug(error);
            res.status(404).json({ msg: error.message });
        }
    },
    verCursosDelAlumno: async (req = request, res = response) => {
        try {
            const alumnoUser = req.query.user; // ?id=${alumnoID} en el frontEnd

            //Crear en model una funcion para obtener al alumno (arreglo) de acuerdo a su nombre de usuario
            const alumnoFound = await alumnoModel.getAlumnoByUsuario(
                alumnoUser
            );
            console.log(alumnoFound);

            if (alumnoFound.length === 0) {
                return res.status(404).json("Alumno no existe");
            }

            const cursosAlumno = await alumnoModel.getCursosAlumno(
                alumnoFound[0].cod_alumno
            );

            if (cursosAlumno.length === 0) {
                return res.status(200).json("No hay cursos matriculados");
            }
            //RESPONDER CON
            res.status(200).json(cursosAlumno);
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: err.message });
        }
    },
    //POST
    /*postEnviarRectificacion : async (req, res = response) => {

        try {
            const {cod_alumno,fecha} = req.body;

            //OBTENER EL ARREGLO DE USUARIOS DE ACUERDO AL USUARIO
            const Found =  await alumnoModel.getById(cod_alumno);

            if (Found.length === 0) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Alumno no encontrado !!",
                        },
                    ],
                });
            }
            //METODO PARA INSERTAR A LA BASE DE DATOS, RECTIFICACION

            res.json({
                cod_alumno,
                fecha
            });


        } catch (err) {
            console.log(err);
            res.status(500).json({msg: err.message});
        }
    }*/
    postEnviarRectificacion : async (req, res = response) => {

        const jsonData = [req.body]; // Suponiendo que estás enviando el JSON en el cuerpo de la solicitud POST
        console.log("JSON DATA",jsonData[0]);
        console.log("CURSOS A RETIRARSE: ",jsonData[0].retiros);
        
        // //vector de objetos de los cursos
        // const cursosRetiro = jsonData[0].retiros;
        // const cursosIngreso = jsonData[0].ingresos;
        // const cursosCambio = jsonData[0].cambios;
        
        const filePathRetiros = './excel/rectiRetiros.xlsx'; // Ruta al archivo Excel
        const filePathIngresos = './excel/rectiIngresos.xlsx'; 


        const mensaje = {
            respuesta1:"",
            respuesta2:"",
        };

        if(jsonData[0].retiros.length > 0 ){
            RectiRetiros(filePathRetiros,jsonData);
            mensaje.respuesta1 = 'Rectificaciones de Retiro agregados correctamente al archivo Excel';
            
        }
        if(jsonData[0].ingresos.length > 0 ){
            RectiIngresos(filePathIngresos,jsonData);
            mensaje.respuesta2 = 'Rectificaciones de Ingreso agregados correctamente al archivo Excel';      
        }

        res.send(mensaje);
    }
};
module.exports = AlumnoController;
