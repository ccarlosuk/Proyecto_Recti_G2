const debug = require("debug")("app:module-users-controller");

const alumnoModel = require("../models/AlumnoModel");
const {response, request} = require("express");
const usuarioModel = require("../models/UsuarioModel");

const AlumnoController = {
    //GET
    getAlumno: async (req = request, res = response) => {
        try {
            const { id } = req.params;
            console.log(id);
            let alumno = await alumnoModel.getById(id);
            console.log(alumno);

            if (!alumno || alumno.length === 0) {
                return res.status(404).json("Alumno no existe");
            } else {
                return res.status(200).json({
                    id,
                    alumno
                });
            }
        } catch (error) {
            debug(error);
            res.status(404).json({msg: error.message});
        }
    },
    verCursosDelAlumno: async (req = request, res = response) => {
        try {
            const alumno = req.query.user;// ?id=${alumnoID} en el frontEnd
            //Crear en model una funcion para obtener al alumno de acuerdo a su id
            const userFound = await usuarioModel.checkUserExists(alumno);

            res.status(200).json({
                id: userFound[0].id_usuario,
                username: userFound[0].usuario,
                constrasenia: userFound[0].contrasenia,
            });

        }catch (err) {
            console.log(err);
            res.status(500).json({msg: err.message});
        }
    }
}
module.exports = AlumnoController;
