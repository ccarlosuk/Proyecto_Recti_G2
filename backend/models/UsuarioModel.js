const query = require("../database/dbConnection");

class UsuarioModel {

    checkEmailExists(email) {
        const queryString = "SELECT * FROM usuario WHERE correo = ?";
        const result = query(queryString, email);
        return result;
    }

    checkUserExists(usuario) {
        const queryString =`
            select u.id_usuario, u.usuario, u.contrasenia, r.nombre_rol
            from usuario u
            join rol as r
            on u.id_rol = r.id_rol
            where u.usuario = ?`;
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