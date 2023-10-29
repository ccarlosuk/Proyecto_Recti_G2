const {request, response} = require("express");
const verCursosMatriculados = async (req = request, res = response) => {

    res.json({
       message: "Se listan los cursos matriculados"
    });
};

module.exports = verCursosMatriculados;