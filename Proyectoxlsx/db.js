
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
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

            const passwordHashed = bcrypt.hashSync(cod_alumno, 2);
            console.log('hasheado');
            const query = 'INSERT IGNORE INTO alumno (cod_alumno, apellido_paterno, apellido_materno, nombre, anio_ingreso, situ_academica, correo, promedio_ponderado,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)';
            // Reemplaza "columna1", "columna2", "columna3" con los nombres de tus columnas

            await connection.execute(query, [cod_alumno, ape_paterno, ape_materno, nom_alumno, anio_ingreso, situ_academica, coe_alumno, promedio_ponderado, passwordHashed]);
            console.log(++i);
        }
        console.log('Datos insertados con éxito.');
    } catch (error) {
        console.error('Error al insertar datos:', error);
    } finally {
        connection.close();
    }
}

module.exports.insertData = insertData;