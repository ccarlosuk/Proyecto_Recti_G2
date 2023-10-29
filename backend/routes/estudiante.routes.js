const { Router } = require("express");

const estudianteAuth = require("../middleware/estudianteAuth");
const usuarioAuth = require("../middleware/usuarioAuth");
const { AlumnoController } = require("../controllers/AlumnoController");

const router = Router();

//LISTAR LOS CURSOS MATRICULADOS
/* router.get(
    "/cursos-matriculados",
    [usuarioAuth, estudianteAuth],
    verCursosMatriculados
); */

//LISTAR LOS DATOS DEL ESTUDIANTE
router.get(
    "/alumnos/:id",
    [usuarioAuth, estudianteAuth],
    AlumnoController.getAlumno
);

//ENVIAR DATOS DE LA RECTIFICACIÓN AL BACKEND
//router.post();

module.exports = router;
