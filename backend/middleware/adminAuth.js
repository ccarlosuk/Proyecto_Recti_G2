const query = require("../database/dbConnection");

const AdminAuth = async (req, res, next) => {
  const token = req.headers.token;
  const admin = await query("SELECT * FROM USUARIO " +
  "WHERE TOKEN = ? AND ROL = 'ADMINISTRADOR'", [token]);

  if(admin[0]){
      next();
  }else {
      res.status(403).json("Tu no tienes permiso para acceder a esta página");
  }
};
module.exports = AdminAuth;



