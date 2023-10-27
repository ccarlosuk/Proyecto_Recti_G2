const jwt  = require('jsonwebtoken');
require('dotenv').config({path: '../.env'})

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const UsuarioAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token){
            return res
                .status(401)
                .json({message: "No token, autorización denegada"});
        }
        //VERIFICAR EL TOKEN DE FORMA ASÍNCRONA
        jwt.verify(token, TOKEN_SECRET, async (error, decoded) => {
            if (error){
                if (error instanceof  jwt.JsonWebTokenError){
                    return res.status(401).json({message: "TOKEN INVÁLIDO"}); //TOKEN INVÁLIDO
                }
                if (error instanceof  jwt.TokenExpiredError){
                    return res.status(401).json({message: "TOKEN EXPIRADO"}); //TOKEN EXPIRADO
                }
                return res.status(500).json({message: error.message}); //OTROS ERRORES
            }
            //CUALQUIER INFO CONTENIDA EN EL TOKEN SE AGREGA AL OBJETO DE SOLICITUD 'req.decoded'
            //PARA QUE SEAN UTILIZADOS POR OTRAS RUTAS
            req.user = decoded;
            next();
        });
    }catch (err) {
        return res.status(500).json({message: err.message});
    }
}
module.exports = UsuarioAuth;