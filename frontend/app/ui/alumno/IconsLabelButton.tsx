'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import {useState} from "react";
import axios from "@/app/api/apiR";
import {getAuthUser, setAuthUser} from "@/src/helper/Storage";

import fechaActualString from "@/app/lib/funciones-auxiliares";
import fs from 'fs';

import * as XLSX from "xlsx";

export default function IconLabelButtons({exportData} ) {

    //---------------------------------------------------------------------------------------------------------------
    const auth = getAuthUser();

    const idAlumno = auth.id;

    type petRetificacion = {
        cod_alumno: string;
        fecha: any;
        loading: boolean,
        err: string[] | null;
    };

    const [soli, setSoli] = useState<petRetificacion>({
        cod_alumno:  "",
        fecha :  Date(),
        loading: false,
        err: null , //err puede ser null o un [] String
    });

    const EnviarFormulario = async (e: { preventDefault: () => void }) => {
        //noStore();
        e.preventDefault();
        setSoli({...soli, fecha: fechaActualString, loading: true, err: null,});
        await axios
            .post(`http://localhost:8080/api/alumno/rectificacion-solicitud?id=${idAlumno}`, {
                /*cod_alumno: exportData.cod_alumno,
                apellidos:exportData.apellidos,
                nombres:exportData.nombres,
                plan_de_estudio:exportData.plan,
                situacion:exportData.situacion,*/



                cod_alumno: exportData.codigo_alumno,
                apellidos:exportData.apellidos_page,
                nombres:exportData.nombres_page,
                plan_de_estudio:exportData.plan_page,
                situacion:exportData.situacion_page,
                motivo_solicitud:"Cambio",
                ingresos:[
                    {
                        codigo_curso:"cod_curso",
                        nombre:"",
                        grupo_a_ingresar:"",
                        grupo_a_ingresar_2daOp:"",
                        procede:""
                    },
                ],
                retiros:[
                    {
                        codigo_curso_retiro:"",
                        nombre_retiro:"",
                        grupo_del_retiro:"",
                        procede:""
                    },
                ],
                fecha: fechaActualString(),
            })
            .then((resp) => {
                setSoli({...soli, loading: false, err: null});
                //console.log("mensaje de respuesta: ",resp.data.message);
                console.log("mensaje de respuesta 1: ", resp.data);


                //LANZAR UNA FUNCION DE VERIFICACION
                console.log("ENVIADO CORRECTAMENTE");
                /*setAuthUser(resp.data);
                router.push("/dashboard");
                console.log("/dashboard/" + resp.data.rol);
                //router.push("/Alumno");*/

            })
            .catch((err) => {
                console.log(err.response.data.errors);
                // console.log(err);
                // console.log(login.usuario);
                // console.log(login.password);
                // console.log('Detalles del error:', err.response.data);

                if (err.response.status === 400 || err.response.status === 422) {
                    setSoli({
                        ...soli,
                        loading: false,
                        err: err.response.data.errors[0].msg,
                    });
                } else {
                    setSoli({
                        ...soli,
                        loading: false,
                        err: ["Algo salió mal"],
                    });
                }
            });
    }
        /*
        const EnviarFormulario = async (e: { preventDefault: () => void }) => {
        //noStore();
        e.preventDefault();

        setSoli({ ...soli,fecha: fechaActualString, loading: true, err: null, });
        await axios
            .post(`http://localhost:8080/api/alumno/rectificacion-solicitud?id=${idAlumno}`, {
                cod_alumno: soli.cod_alumno,
                fecha: soli.fecha
            })
            .then((resp) => {
                setSoli({ ...soli, loading: false, err: null });
                //console.log("mensaje de respuesta: ",resp.data.message);
                console.log("mensaje de respuesta 1: ",resp.data);


                //LANZAR UNA FUNCION DE VERIFICACION
                console.log("ENVIADO CORRECTAMENTE");
                /!*setAuthUser(resp.data);
                router.push("/dashboard");
                console.log("/dashboard/" + resp.data.rol);
                //router.push("/Alumno");*!/

            })
            .catch((err) => {
                console.log(err.response.data.errors);
                // console.log(err);
                // console.log(login.usuario);
                // console.log(login.password);
                // console.log('Detalles del error:', err.response.data);

                if (err.response.status === 400 || err.response.status === 422) {
                    setSoli({
                        ...soli,
                        loading: false,
                        err: err.response.data.errors[0].msg,
                    });
                } else {
                    setSoli({
                        ...soli,
                        loading: false,
                        err: ["Algo salió mal"],
                    });
                }
            });
    console.log("Presionado boton enviar");
    return null//JSON.stringify({name:yo});*/

    
        return (
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Borrar
                </Button>
                <Button type="submit" onClick={EnviarFormulario} variant="contained" endIcon={<SendIcon />}>
                    Enviar
                </Button>
            </Stack>
        );

}
