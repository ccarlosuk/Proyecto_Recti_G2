const express = require('express');
const fs = require('node:fs');
const iconv = require('iconv-lite');
const { insertData,
    insertAsignaturas,
    insertarPlanAcademico,
    ingresarSecciones,
    insertarAlumno_Seccion,
    insertartipoRectificacion,
    insertarHorarios,
    insertarCupos } = require('./db.js');
const { obtenerDatosDeMatriculados, obtenerDatosDeCursos } = require('./metodosxlsx.js');
const { insertUsuarios, insertRoles } = require("./db");

const app = express();



// Llama a la función para insertar los datos
// insertData(data);



app.get('/', async (req, res) => {
    try {
        const data = obtenerDatosDeMatriculados();

        await insertData(data);
        await insertRoles();

        await insertartipoRectificacion();
        await insertarHorarios();
        await insertarCupos();

        await insertUsuarios(data);
        // // const asignaturas = obtenerDatosDeCursos();*!/
        await insertAsignaturas(data);
        await ingresarSecciones(data);
        await insertarPlanAcademico(data);
        await insertarAlumno_Seccion(data);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Aplicacion ejecutandose en http://localhost:${PORT}`);
});