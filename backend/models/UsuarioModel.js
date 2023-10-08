const query = require("../database/dbConnection");

//const util = require("util");
//const query = util.promisify(conexion.query).bind(conexion);

class UsuarioModel {

    checkEmailExists(email) {
        const queryString = "SELECT * FROM usuario WHERE correo = ?";
        const result = query(queryString, email);
        return result;
    }

    checkUserExists(usuario) {
        const queryString = "SELECT * FROM usuario WHERE usuario = ?";
        const result = query(queryString, usuario);
        return result;
    }
}
usuarioModel = new UsuarioModel();

/*//------------------PRUEBA------------------

const respuesta = async () => {
    try {
        const user = await usuarioModel.checkEmailExists('juan.ayma@unmsm.edu.pe');
        if (user.length === 0) {
            console.log('Correo o contraseña no encontrado');
        } else {
            console.log('Usuario ingresa al sistema');
        }
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error);
    }
};

respuesta();
//-------------------------------------------------*/
module.exports = usuarioModel;