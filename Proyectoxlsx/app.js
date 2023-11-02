const express = require('express');
const fs = require('node:fs');
const iconv = require('iconv-lite');
const { insertData, insertAsignaturas } = require('./db.js');
const { obtenerDatosDeMatriculados, obtenerDatosDeCursos } = require('./metodosxlsx.js');
const {insertUsuarios, insertRoles} = require("./db");

const app = express();



// Llama a la función para insertar los datos
// insertData(data);



app.get('/', async (req, res) => {
    try {
        const matriculados = obtenerDatosDeMatriculados();
        await insertData(matriculados);
        await insertRoles();
        await insertUsuarios(matriculados);
        const asignaturas = obtenerDatosDeCursos();
        await insertAsignaturas(asignaturas);
        res.send(matriculados);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Aplicacion ejecutandose en http://localhost:${PORT}`);
});