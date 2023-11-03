const query = require("../database/dbConnection");
const AlumnoAuth = async (req, res, next) => {
    //console.log(req.user.id);
    const estudiante = await query(
        `SELECT u.id_usuario, u.usuario, r.nombre_rol
         FROM USUARIO as u
                  JOIN ROL as r ON u.ID_ROL = r.ID_ROL
         WHERE u.id_usuario = ? AND r.NOMBRE_ROL= 'ALUMNO';`,
        [req.user.id]
    );
    if (estudiante[0]) {
        next();
    } else {
        res.status(403).json("Tú no tienes permiso para acceder a esta pagina");
    }
};

module.exports = AlumnoAuth;
