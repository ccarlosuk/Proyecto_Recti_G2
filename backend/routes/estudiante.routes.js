const { Router } = require('express');

const estudianteAuth = require('../middleware/estudianteAuth');
const usuarioAuth = require('../middleware/usuarioAuth');
const verCursosMatriculados = require("../controllers/EstudianteController");

const router = Router();

//LISTAR LOS CURSOS MATRICULADOS
router.get('/cursos-matriculados',[
    usuarioAuth,
    estudianteAuth
],verCursosMatriculados);

//LISTAR LOS DATOS DEL ESTUDIANTE
router.get('/datos-estudiante',[
    usuarioAuth,
    estudianteAuth,
], verDatosEstudiante);

//ENVIAR DATOS DE LA RECTIFICACIÓN AL BACKEND
//router.post();


module.exports = router;