const { Router } = require("express");
const {UsuarioController} = require("../controllers/UsuarioController");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");

const router = Router();

//POST: Para obtener un listado o un recurso en concreto.
router.post('/login',[
    //check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y de más de 6 letras').isLength({min:6}),
    //check('correo', 'El valor ingresado no tiene el aspecto de un correo').isEmail(),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos //Ejecutar el middleware para revisar los errores
],UsuarioController.login );

router.post('/logout',UsuarioController.logout);

module.exports = router;
