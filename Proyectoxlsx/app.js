const express = require('express');
const XLSX = require('xlsx');
const fs = require('node:fs');
const iconv = require('iconv-lite');
const { insertData } = require('./db.js');

const app = express();

// Ruta al archivo XLSX
const filePath = './excel/matriculados.xlsx';

const options = {
    range: 0
};

// Llama a la función para insertar los datos
// insertData(data);

// Nombre de la hoja que deseas leer
const sheetName = 'ROSARIO 2022-2';

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