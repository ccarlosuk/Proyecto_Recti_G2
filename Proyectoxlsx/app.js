const express = require('express');
const fs = require('node:fs');
const iconv = require('iconv-lite');
const { insertData, insertAsignaturas } = require('./db.js');
const { obtenerDatosDeMatriculados, obtenerDatosDeCursos } = require('./metodosxlsx.js');

const app = express();



// Llama a la función para insertar los datos
// insertData(data);



app.get('/', (req, res) => {
    const matriculados = obtenerDatosDeMatriculados()
    insertData(matriculados);
    const asignaturas = obtenerDatosDeCursos();
    insertAsignaturas(asignaturas);
    res.send(matriculados);
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Aplicacion ejecutandose en http://localhost:${PORT}`);
});