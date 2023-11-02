
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const validarUsuario = require("./helpers/validar-usuario");

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyectorecti',
};

// Conecta a la base de datos
async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (error) {
        throw error;
    }
}
let i = 0;

// Inserta los datos en la tabla
async function insertData(data) {
    const connection = await connectToDatabase();

    try {
        // Itera sobre los objetos y realiza inserciones

        for (const item of data) {
            // cod_alumno,ape_paterno,ape_materno,nom_alumno,anio_ingreso,situ_academica,coe_alumno,promedio_ponderado
            // const query = 'INSERT INTO prueba (codigo, plan, situacion) VALUES (?, ?, ?)';
            let {
                cod_alumno,
                ape_paterno = "",
                ape_materno = "",
                nom_alumno = "",
                anio_ingreso = "",
                coe_alumno = "",
                situ_academica = 'Regular',
                promedio_ponderado = 10.0
            } = item;

            if (cod_alumno === undefined) {
                continue;
            }


            const query = 'INSERT IGNORE INTO alumno (cod_alumno, apellido_paterno, apellido_materno, nombre, anio_ingreso, situ_academica, correo, promedio_ponderado) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
            // Reemplaza "columna1", "columna2", "columna3" con los nombres de tus columnas

            await connection.execute(query, [cod_alumno, ape_paterno, ape_materno, nom_alumno, anio_ingreso, situ_academica, coe_alumno, promedio_ponderado]);
            // console.log(++i);
        }
        console.log('Datos insertados con éxito.');
    } catch (error) {
        console.error('Error al insertar datos:', error);
    } finally {
        connection.close();
    }
}


async function insertAsignaturas(data) {
    const connection = await connectToDatabase();

    try {
        // Itera sobre los objetos y realiza inserciones

        for (const item of data) {
            // cod_alumno,ape_paterno,ape_materno,nom_alumno,anio_ingreso,situ_academica,coe_alumno,promedio_ponderado
            // const query = 'INSERT INTO prueba (codigo, plan, situacion) VALUES (?, ?, ?)';
            let {
                cod_asignatura,
                des_asignatura = "",
                num_creditaje = "",
                cod_seccion = "",
                num_ciclo_ano_asig = 0
            } = item;

            if (cod_asignatura === undefined) {
                continue;
            }

            const query = 'INSERT IGNORE INTO asignatura (cod_asignatura, nombre, creditaje, grupo, ciclo_asignatura) VALUES (?, ?, ?, ?, ?)';
            // Reemplaza "columna1", "columna2", "columna3" con los nombres de tus columnas

            await connection.execute(query, [cod_asignatura, des_asignatura, num_creditaje, cod_seccion, num_ciclo_ano_asig]);
            // console.log(++i);
        }
        console.log('Asignaturas insertadas con éxito.');
    } catch (error) {
        console.error('Error al insertar datos:', error);
    } finally {
        connection.close();
    }
}

async function insertRoles() {
    const connection = await connectToDatabase();
    const roles = ["alumno","director","administrador"];

    try {
        for (const elemento of roles) {
            const query = 'INSERT IGNORE INTO Rol (nombre_rol) VALUES (?)';
            await connection.execute(query, [elemento]);
        }
        console.log('roles insertados con éxito.');
    } catch (error) {
        console.error('Error al insertar roles:', error);
    } finally {
        connection.close();
    }
}
async function insertUsuarios(data) {
    const connection = await connectToDatabase();

    try {
        // Itera sobre los objetos y realiza inserciones

        for (const item of data) {
            // INSERT INTO Usuario (id_usuario, usuario, contrasenia, id_rol)
            // VALUES ('16200004', 'juan.ayma', '28603643877848', 1);
            let {
                cod_alumno,
                coe_alumno = "",
                id_rol = "1",//Estudiante
            } = item;

            if (cod_alumno === undefined) {
                continue;
            }
            const usuario = validarUsuario(coe_alumno);
            const passwordHashed = await bcrypt.hash(cod_alumno, 2);
            // console.log('hasheado');
            const query1 = `INSERT IGNORE INTO Usuario (id_usuario, usuario, contrasenia, id_rol) VALUES (?, ?, ?, ?)`;
            await connection.execute(query1, [cod_alumno, usuario, passwordHashed, id_rol]);
            const query2 = `UPDATE alumno SET id_usuario = ?
                            WHERE cod_alumno = ?`;
            await connection.execute(query2, [cod_alumno, cod_alumno]);
        }
        console.log('Usuarios insertados con éxito.');
    } catch (error) {
        console.error('Error al insertar usuarios:', error);
    } finally {
        connection.close();
    }
}

module.exports = {
    insertData: insertData,
    insertAsignaturas: insertAsignaturas,
    insertUsuarios: insertUsuarios,
    insertRoles:insertRoles
}