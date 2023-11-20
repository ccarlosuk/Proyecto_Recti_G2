const debug = require("debug")("app:module-users-controller");

const alumnoModel = require("../models/AlumnoModel");
const { response, request } = require("express");
const usuarioModel = require("../models/UsuarioModel");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../lib/jwt");
const fs = require("fs");
const XLSX = require('xlsx');

const AlumnoController = {
    //GET
    getAlumno: async (req = request, res = response) => {
        try {
            //const { id } = req.params;
            const id = req.query.id;
            console.log(id);
            const alumno = await alumnoModel.getById(id);
            console.log(alumno);

            if (!alumno || alumno.length === 0) {
                return res.status(404).json("Alumno no existe");
            } else {
                return res.status(200).json({
                    id,
                    alumno,
                });
            }
        } catch (error) {
            debug(error);
            res.status(404).json({ msg: error.message });
        }
    },
    verCursosDelAlumno: async (req = request, res = response) => {
        try {
            const alumnoUser = req.query.user; // ?id=${alumnoID} en el frontEnd

            //Crear en model una funcion para obtener al alumno (arreglo) de acuerdo a su nombre de usuario
            const alumnoFound = await alumnoModel.getAlumnoByUsuario(
                alumnoUser
            );
            console.log(alumnoFound);

            if (alumnoFound.length === 0) {
                return res.status(404).json("Alumno no existe");
            }

            const cursosAlumno = await alumnoModel.getCursosAlumno(
                alumnoFound[0].cod_alumno
            );

            if (cursosAlumno.length === 0) {
                return res.status(200).json("No hay cursos matriculados");
            }
            //RESPONDER CON
            res.status(200).json(cursosAlumno);
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: err.message });
        }
    },
    //POST
    /*postEnviarRectificacion : async (req, res = response) => {

        try {
            const {cod_alumno,fecha} = req.body;

            //OBTENER EL ARREGLO DE USUARIOS DE ACUERDO AL USUARIO
            const Found =  await alumnoModel.getById(cod_alumno);

            if (Found.length === 0) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Alumno no encontrado !!",
                        },
                    ],
                });
            }
            //METODO PARA INSERTAR A LA BASE DE DATOS, RECTIFICACION

            res.json({
                cod_alumno,
                fecha
            });


        } catch (err) {
            console.log(err);
            res.status(500).json({msg: err.message});
        }
    }*/
    postEnviarRectificacion : async (req, res = response) => {

        const jsonData = [req.body]; // Suponiendo que estás enviando el JSON en el cuerpo de la solicitud POST
        console.log("JSON DATA",jsonData[0]);
        const filePath = './excel/datos.xlsx'; // Ruta al archivo Excel
        const sheetName = 'Datos'; // Nombre de la hoja en el archivo Excel

        let workbook;

        if (fs.existsSync(filePath)) {
            // Si el archivo existe, lo lee
            workbook = XLSX.readFile(filePath);
        } else {
            // Si el archivo no existe, crea un nuevo libro de trabajo y una hoja
            workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([[]]), sheetName);
        }

        const worksheet = workbook.Sheets[sheetName];
        //XLSX.utils.sheet_add_aoa(worksheet, [["Ingreso", "", "", "", "", "Retiro"]], { origin: "G1" });
        // Agregar encabezados a las celdas fusionadas



        /*const jsonData = [
            // Datos del archivo JSON que deseas agregar
            { "nombre": 'Nuevo Ejemplo 7', "edad": 28, "ciudad": 'Ciudad 3' },
            { "nombre": 'Nuevo Ejemplo 8', "edad": 35, "ciudad": 'Ciudad 4' },
            // ... más datos JSON
        ];*/

        // Encabezados únicos para las columnas
        const headers = Object.keys(jsonData[0]); // Obtiene los nombres de las propiedades del primer objeto JSON
        // Obtener los encabezados específicos de la propiedad 'ingresos' del primer objeto
        console.log("Headers", headers );

        //const aux = jsonData[0].ingreso[0];
        // console.log("objeto:",aux);
        //const ingresosHeaders = Object.keys(aux);
        //const headersRetiro = Object.keys(jsonData[0].retiros && jsonData[0].retiros[0]);
        //console.log("ingresos-retiros", ingresosHeaders );

        // Función para obtener los encabezados únicos de un objeto y sus subobjetos
        function getHeaders(obj) {
            const headers = new Set();

            function extractHeaders(object) {
                for (const key in object) {
                    if (Array.isArray(object[key])) {
                        // Si es un arreglo, llamar recursivamente para cada elemento del arreglo
                        object[key].forEach(extractHeaders);
                    } else if (typeof object[key] === 'object') {
                        // Si es un objeto, llamar recursivamente
                        extractHeaders(object[key]);
                    } else {
                        // Es una propiedad, agregar al conjunto de encabezados
                        headers.add(key);
                    }
                }
            }

            extractHeaders(obj);
            return Array.from(headers);
        }

        const headersRoot = getHeaders(jsonData);
        console.log("HEADERS ESPERADOS",headersRoot);


        // Si no hay datos existentes, se agregan los encabezados
        if (!worksheet || !worksheet['!ref']) {

            // Fusionar celdas
            worksheet['!merges'] = [
                ...(worksheet['!merges'] || []), // Mantener las fusiones existentes
                { s: { r: 0, c: 6 }, e: { r: 0, c: 10 } }, // Fusión para 'Ingreso'
                { s: { r: 0, c: 11 }, e: { r: 0, c: 15 } } // Fusión para 'Retiro'
            ];
            const headers1 = ["Ingreso", "", "", "", "", "Retiro"];
            const headerRow1 = headers1.map((header, index) => {
                const cellAddress = XLSX.utils.encode_cell({ c: 6 + index, r: 0 }); // Comienza en la columna G (c: 6)
                return { [cellAddress]: { t: 's', v: header, w: header } };
            }).reduce((prev, curr) => Object.assign(prev, curr), {});

            // Agregar los encabezados a la hoja de cálculo
            XLSX.utils.sheet_add_aoa(worksheet, [headers1], { origin: 'G1' });
            Object.assign(worksheet, headerRow1);


            const headerRow = headersRoot.map((header, index) => {
                const cellAddress = XLSX.utils.encode_cell({ c: index, r: 1 });
                return { [cellAddress]: { t: 's', v: header, w: header } };
            }).reduce((prev, curr) => Object.assign(prev, curr), {});

            // Agregar los encabezados a la hoja de cálculo
            XLSX.utils.sheet_add_aoa(worksheet, [headersRoot], { origin: 'A2' });
            Object.assign(worksheet, headerRow);
        }

        // Obtener la fila en la que se insertarán los nuevos datos
        let startingRow = XLSX.utils.decode_range(worksheet['!ref'] || 'A3').e.r + 1;

        // Agregar los datos del JSON a la hoja de cálculo a partir de la siguiente fila disponible
        XLSX.utils.sheet_add_json(worksheet, jsonData, { skipHeader: true, origin: startingRow });

        // Escribir el libro de trabajo con los cambios en el archivo
        XLSX.writeFile(workbook, filePath);

        res.send('Datos agregados correctamente al archivo Excel');
    }
};
module.exports = AlumnoController;
