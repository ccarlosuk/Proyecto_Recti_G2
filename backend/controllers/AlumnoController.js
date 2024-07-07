const debug = require("debug")("app:module-users-controller");
const query = require("../database/dbConnection");
const alumnoModel = require("../models/AlumnoModel");
const { response, request } = require("express");
const usuarioModel = require("../models/UsuarioModel");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../lib/jwt");
const fs = require("fs");
const XLSX = require('xlsx');
const { RectiRetiros, RectiIngresos, RectiCambios } = require("../helpers/metodosRectificacion");

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
    /*postEnviarRectificacion : async (req, res = response) => {

        const jsonData = [req.body]; // Suponiendo que estás enviando el JSON en el cuerpo de la solicitud POST
        console.log("JSON DATA",jsonData[0]);
        console.log("CURSOS A RETIRARSE: ",jsonData[0].cambios[0][0]);
        console.log("CURSOS A INGRESAR: ",jsonData[0].cambios[1][0]);
        
        // //vector de objetos de los cursos
        // const cursosRetiro = jsonData[0].retiros;
        // const cursosIngreso = jsonData[0].ingresos;
        // const cursosCambio = jsonData[0].cambios;
        
        const filePathRetiros = './excel/rectiRetiros.xlsx'; // Ruta al archivo Excel
        const filePathIngresos = './excel/rectiIngresos.xlsx'; 
        const filePathCambios = './excel/rectiCambios.xlsx';

        const mensaje = {
            respuesta1:"",
            respuesta2:"",
            respuesta3:"",
        };

        if(jsonData[0].retiros.length > 0 ){
            RectiRetiros(filePathRetiros,jsonData);
            mensaje.respuesta1 = 'Rectificaciones de Retiro agregados correctamente al archivo Excel';
            
        }
        if(jsonData[0].ingresos.length > 0 ){
            RectiIngresos(filePathIngresos,jsonData);
            mensaje.respuesta2 = 'Rectificaciones de Ingreso agregados correctamente al archivo Excel';      
        }

        if(jsonData[0].cambios[0].length > 0 ){
            RectiCambios(filePathCambios,jsonData);
            mensaje.respuesta3 = 'Rectificaciones de Cambio agregados correctamente al archivo Excel';      
        }

        res.send(mensaje);
    }*/

    /*postEnviarRectificacion: async (req, res = response) => {
        const jsonData = [req.body];
        const { cod_alumno, fecha, retiros, ingresos, cambios } = jsonData[0];
        const filePathRetiros = './excel/rectiRetiros.xlsx';
        const filePathIngresos = './excel/rectiIngresos.xlsx';
        const filePathCambios = './excel/rectiCambios.xlsx';

        const mensaje = {
            respuesta1: "",
            respuesta2: "",
            respuesta3: "",
        };

        if (retiros.length > 0) {
            RectiRetiros(filePathRetiros, jsonData);
            mensaje.respuesta1 = 'Rectificaciones de Retiro agregados correctamente al archivo Excel';
        }
        if (ingresos.length > 0) {
            RectiIngresos(filePathIngresos, jsonData);
            mensaje.respuesta2 = 'Rectificaciones de Ingreso agregados correctamente al archivo Excel';
        }
        if (cambios[0].length > 0) {
            RectiCambios(filePathCambios, jsonData);
            mensaje.respuesta3 = 'Rectificaciones de Cambio agregados correctamente al archivo Excel';
        }

        try {
            // Guardar en la base de datos
            const id_rectificacion = `recti_${Date.now()}`;
            await query(
                'INSERT INTO Rectificacion (id_rectificacion, cod_alumno, fecha, estado) VALUES (?, ?, ?, ?)',
                [id_rectificacion, cod_alumno, fecha, 'en espera']
            );

            const obtenerNombreAsignatura = async (cod_asignatura) => {
                const result = await query(
                    'SELECT nombre FROM Asignatura WHERE cod_asignatura = ?',
                    [cod_asignatura]
                );
                return result[0]?.nombre || '';
            };

            const insertaDetalleRectificacion = async (data, tipo) => {
                for (const item of data) {
                    const id_deta_recti = `deta_${Date.now()}_${Math.random()}`;
                    const {
                        cod_asignatura = '',
                        id_seccion_ingresar = null,
                        id_seccion_ingresar_2da_opcion = null,
                        id_seccion_retirar = null,
                        motivo = 'SALUD',
                        num_repitencia = 0
                    } = item;

                    const nombre_asignatura = await obtenerNombreAsignatura(cod_asignatura);

                    await query(
                        'INSERT INTO Detalle_Rectificacion (id_deta_recti, id_rectificacion, cod_asignatura, nombre_asignatura, id_seccion_ingresar, id_seccion_ingresar_2da_opcion, id_seccion_retirar, id_tipo_recti, motivo, num_repitencia, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [id_deta_recti, id_rectificacion, cod_asignatura, nombre_asignatura, id_seccion_ingresar, id_seccion_ingresar_2da_opcion, id_seccion_retirar, tipo, motivo, num_repitencia, 'en espera']
                    );
                }
            };

            if (retiros.length > 0) {
                await insertaDetalleRectificacion(retiros, 'retiro');
            }
            if (ingresos.length > 0) {
                await insertaDetalleRectificacion(ingresos, 'ingreso');
            }
            if (cambios.length > 0) {
                await insertaDetalleRectificacion(cambios, 'cambio');
            }

            res.status(200).send(mensaje);
        } catch (error) {
            console.error('Error al guardar la solicitud de rectificación:', error);
            res.status(500).send('Error al guardar la solicitud de rectificación');
        }
    }
};*/

postEnviarRectificacion : async (req, res = response) => {
    const jsonData = req.body;
    console.log("JSON DATA", jsonData);
    console.log("CURSOS A RETIRARSE: ", jsonData.retiros);
    console.log("CURSOS A INGRESAR: ", jsonData.ingresos);
    console.log("CURSOS A CAMBIO: ", jsonData.cambios);

    const { retiros, ingresos, cambios, cod_alumno, fecha } = jsonData;

    // Guardar en Excel
    const filePathRetiros = './excel/rectiRetiros.xlsx';
    const filePathIngresos = './excel/rectiIngresos.xlsx';
    const filePathCambios = './excel/rectiCambios.xlsx';

    if (retiros.length > 0) {
        RectiRetiros(filePathRetiros, [jsonData]);
    }
    if (ingresos.length > 0) {
        RectiIngresos(filePathIngresos, [jsonData]);
    }
    if (cambios.length > 0) {
        RectiCambios(filePathCambios, [jsonData]);
    }

    // Guardar en Base de Datos
    try {
        const id_rectificacion = `recti_${Date.now()}`;
        const estado = "en espera";

        const queryInsertRectificacion = `INSERT INTO Rectificacion (id_rectificacion, cod_alumno, fecha, estado) VALUES (?, ?, ?, ?)`;
        console.log("INSERTANDO RECTIFICACIÓN:", id_rectificacion, cod_alumno, fecha, estado);
        await query(queryInsertRectificacion, [id_rectificacion, cod_alumno, fecha, estado]);

        const getAsignaturaNombre = async (cod_asignatura) => {
            const queryAsignatura = `SELECT nombre FROM Asignatura WHERE cod_asignatura = ?`;
            const [result] = await query(queryAsignatura, [cod_asignatura]);
            return result ? result.nombre : '';
        };

        const insertDetalleRectificacion = async (data, tipo) => {
            const queryInsertDetalle = `INSERT INTO Detalle_Rectificacion (
                id_deta_recti,
                id_rectificacion,
                cod_asignatura_ingreso,
                nombre_asignatura_ingreso,
                id_seccion_ingresar,
                id_seccion_ingresar_2da_opcion,
                cod_asignatura_retiro,
                nombre_asignatura_retiro,
                id_seccion_retirar,
                id_tipo_recti,
                motivo,
                num_repitencia,
                estado,
                observacion
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            for (const item of data) {
                const id_deta_recti = `deta_${Date.now()}_${Math.random()}`;
                const motivo_solicitud = item.motivo || "SALUD";
                const observacion = item.observacion || '';
                const num_repitencia = item.num_repitencia || 0;

                let valores = [
                    id_deta_recti,
                    id_rectificacion,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    tipo,
                    motivo_solicitud,
                    num_repitencia,
                    'en espera',
                    observacion
                ];

                if (tipo === 'ingreso') {
                    const nombre_asignatura = await getAsignaturaNombre(item.cod_asignatura);
                    valores[2] = item.cod_asignatura;
                    valores[3] = nombre_asignatura;
                    valores[4] = item.opc1;
                    valores[5] = item.opc2;
                } else if (tipo === 'retiro') {
                    const nombre_asignatura = await getAsignaturaNombre(item.cod_asignatura);
                    valores[6] = item.cod_asignatura;
                    valores[7] = nombre_asignatura;
                    valores[8] = item.id_seccion;
                } else if (tipo === 'cambio') {
                    const nombre_asignatura = await getAsignaturaNombre(item.cod_asignatura);
                    valores[2] = item.cod_asignatura;
                    valores[3] = nombre_asignatura;
                    valores[4] = item.opc1;
                    valores[5] = item.opc2;
                    valores[6] = item.cod_asignatura;
                    valores[7] = nombre_asignatura;
                    valores[8] = item.id_seccion;
                }

                console.log("INSERTANDO DETALLE RECTIFICACIÓN:", valores);
                await query(queryInsertDetalle, valores);
            }
        };

        if (retiros.length > 0) {
            console.log("INSERTANDO RETIROS:", retiros);
            await insertDetalleRectificacion(retiros, 'retiro');
        }
        if (ingresos.length > 0) {
            console.log("INSERTANDO INGRESOS:", ingresos);
            await insertDetalleRectificacion(ingresos, 'ingreso');
        }
        
        // Forzar registro para cambios
        if (cambios) {
            // Extraer y consolidar los datos de cambio necesarios
            const cambioDatos = cambios.flat();
            console.log("DATOS DE CAMBIO PLANOS: ", cambioDatos);
            const cambioCombinado = cambioDatos.reduce((acc, curr) => {
                if (curr.cod_asignatura && curr.cod_asignatura.trim() !== '') acc.cod_asignatura = curr.cod_asignatura;
                if (curr.nombre_asignatura && curr.nombre_asignatura.trim() !== '') acc.nombre_asignatura = curr.nombre_asignatura;
                if (curr.opc1 && curr.opc1.trim() !== '') acc.opc1 = curr.opc1;
                if (curr.opc2 && curr.opc2.trim() !== '') acc.opc2 = curr.opc2;
                if (curr.motivo && curr.motivo.trim() !== '') acc.motivo = curr.motivo;
                if (curr.id_seccion && curr.id_seccion.trim() !== '') acc.id_seccion = curr.id_seccion;
                acc.tipo = 'cambio';
                return acc;
            }, {});
            console.log("CAMBIO CONSOLIDADO: ", cambioCombinado);

            // Verificar que el objeto cambioCombinado tiene los datos necesarios antes de insertarlo
            if (cambioCombinado.cod_asignatura || cambioCombinado.nombre_asignatura || cambioCombinado.opc1 || cambioCombinado.opc2 || cambioCombinado.motivo || cambioCombinado.id_seccion) {
                console.log("INSERTANDO CAMBIO CONSOLIDADO EN LA BASE DE DATOS");
                await insertDetalleRectificacion([cambioCombinado], 'cambio');
            } else {
                console.log("CAMBIO NO TIENE DATOS SUFICIENTES PARA INSERTAR");
            }
        }

        res.status(200).json({ message: "Rectificación enviada y guardada correctamente" });
    } catch (error) {
        console.log("ERROR AL GUARDAR LA SOLICITUD DE RECTIFICACIÓN", error);
        res.status(500).json({ message: "Error al guardar la solicitud de rectificación", error: error.message });
    }}
};
module.exports = AlumnoController;
