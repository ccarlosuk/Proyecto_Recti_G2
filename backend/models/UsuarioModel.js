const {connection} = require("../config/dbconfig");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

class UsuarioModel {
    checkEmailExists(email) {
        const queryString = "SELECT * FROM user WHERE email = ?";
        const result = query(queryString, email);
        return result;
    }
}
UsuarioModel = new UsuarioModel();
module.exports = UsuarioModel;