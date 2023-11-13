const debug = require("debug")("app:module-users-controller");

const alumnoModel = require("../models/AlumnoModel");
const { response, request } = require("express");
const usuarioModel = require("../models/UsuarioModel");

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
};
module.exports = AlumnoController;
