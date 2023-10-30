const XLSX = require('xlsx');

function obtenerDatosDeMatriculados() {
    // Ruta al archivo XLSX
    const filePath = './excel/matriculados.xlsx';

    const options = {
        range: 0
    };

    // Nombre de la hoja que deseas leer
    const sheetName = 'ROSARIO 2022-2';
    // Leer el archivo XLSXl
    const workbook = XLSX.readFile(filePath);

    // Acceder a la hoja deseada
    const worksheet = workbook.Sheets[sheetName];
    // console.log(worksheet);
    // Convertir los datos de la hoja en un objeto JavaScript
    const data = XLSX.utils.sheet_to_json(worksheet, options);
    // Imprimir los datos
    if (data.length > 0) {
        console.log('Lectura de archivo xlsx exitosa');
        console.log(data.length);
    }
    return data;
}

function obtenerDatosDeCursos() {
    // Ruta al archivo XLSX
    const filePath = './excel/matriculados.xlsx';

    const options = {
        range: 0
    };

    // Nombre de la hoja que deseas leer
    const sheetName = 'ROSARIO 2022-2';
    // Leer el archivo XLSXl
    const workbook = XLSX.readFile(filePath);

    // Acceder a la hoja deseada
    const worksheet = workbook.Sheets[sheetName];
    // console.log(worksheet);
    // Convertir los datos de la hoja en un objeto JavaScript
    const data = XLSX.utils.sheet_to_json(worksheet, options);
    // Imprimir los datos
    if (data.length > 0) {
        console.log('Lectura de archivo xlsx exitosa');
        console.log(data.length);
    }
    return data;
}

module.exports = {
    obtenerDatosDeMatriculados: obtenerDatosDeMatriculados,
    obtenerDatosDeCursos: obtenerDatosDeCursos
};