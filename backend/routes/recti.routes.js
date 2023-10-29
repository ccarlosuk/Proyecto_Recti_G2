const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { usuariosPost } = require("../controllers/UsuarioController");
const { AlumnoController } = require("../controllers/AlumnoControlador");
const router = Router();

//POST: Para obtener un listado o un recurso en concreto.
router
    .get("/", AlumnoController.getAlumnos)
    .get("/:id", AlumnoController.getAlumno);

module.exports = router;
