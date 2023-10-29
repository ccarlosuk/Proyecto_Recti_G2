const createError = require("http-errors");
const debug = require("debug")("app:module-users-controller");

const { AlumnoModel } = require("../models/AlumnoModel");
const { Response } = require("../common/response");

module.exports.AlumnoController = {
    getAlumno: async (req, res) => {
        try {
            const {
                params: { id },
            } = req;
            let alumno = await AlumnoModel.getById(id);
            if (!alumno || alumno.length === 0) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Alumno ${id} `, alumno);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
};
