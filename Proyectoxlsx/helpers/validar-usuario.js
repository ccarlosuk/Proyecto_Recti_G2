
const validarUsuario = (correoElectronico) => {
    const indiceArroba = correoElectronico.indexOf("@");
    if (indiceArroba !== -1) {
        const subcadena = correoElectronico.substring(0, indiceArroba);
        return subcadena; // Salida: "usuario"
        // O puedes usar slice() de la misma manera:
        // let subcadena = correoElectronico.slice(0, indiceArroba);
    } else {
        throw new Error(`El correo ${ correoElectronico } no contiene un símbolo @`);
    }
}
module.exports = validarUsuario;