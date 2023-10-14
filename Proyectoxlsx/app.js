const express = require('express');
const XLSX = require('xlsx');
const fs = require('node:fs');
const iconv = require('iconv-lite');
const mysql = require('mysql2/promise');

const app = express();

// Ruta al archivo XLSX
const filePath = './excel/matricula.xlsx';

const options = {
    range: 4
};

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

// Inserta los datos en la tabla
async function insertData(data) {
    const connection = await connectToDatabase();

    try {
        // Itera sobre los objetos y realiza inserciones
        for (const item of data) {
            const query = 'INSERT INTO prueba (codigo, plan, situacion) VALUES (?, ?, ?)';
            // Reemplaza "columna1", "columna2", "columna3" con los nombres de tus columnas
            await connection.execute(query, [item.codigoALumno, item.plan, item.situacionAcademica]);
        }

        console.log('Datos insertados con éxito.');
    } catch (error) {
        console.error('Error al insertar datos:', error);
    } finally {
        connection.close();
    }
}

// Llama a la función para insertar los datos
// insertData(data);

// Nombre de la hoja que deseas leer
const sheetName = 'Hoja1';

app.get('/', (req, res) => {
    // Leer el archivo XLSX
    const workbook = XLSX.readFile(filePath);

    // Acceder a la hoja deseada
    const worksheet = workbook.Sheets[sheetName];

    // Convertir los datos de la hoja en un objeto JavaScript
    const data = XLSX.utils.sheet_to_json(worksheet, options);
    // Imprimir los datos
    if (data.length > 0) {
        console.log('Lectura de archivo xlsx exitosa');
        console.log(data.length);
    }
    insertData(data);
    res.send(data);
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Aplicacion ejecutandose en http://localhost:${PORT}`);
});