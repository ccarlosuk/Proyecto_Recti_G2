const { Router } = require("express");

const estudianteAuth = require("../middleware/alumnoAuth");
const usuarioAuth = require("../middleware/usuarioAuth");
const AlumnoController = require("../controllers/AlumnoController");

const router = Router();

//LISTAR LOS CURSOS MATRICULADOS
router.get(
    "/alumno/cursos-matriculados",
    [usuarioAuth, estudianteAuth],
    AlumnoController.verCursosDelAlumno
);

//LISTAR LOS DATOS DEL ESTUDIANTE
router.get(
    "/alumno/:id",
    [usuarioAuth, estudianteAuth],
    AlumnoController.getAlumno
);

//ENVIAR DATOS DE LA RECTIFICACIÓN AL BACKEND
//router.post();

module.exports = router;
