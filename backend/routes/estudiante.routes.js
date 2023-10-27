const { Router } = require('express');

const estudianteAuth = require('../middleware/estudianteAuth');
const usuarioAuth = require('../middleware/usuarioAuth');
const verCursosMatriculados = require("../controllers/EstudianteController");

const router = Router();

router.get('/cursos-matriculados',[
    usuarioAuth,
    estudianteAuth
],verCursosMatriculados);

module.exports = router;