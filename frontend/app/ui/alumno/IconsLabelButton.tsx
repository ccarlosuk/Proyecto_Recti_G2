"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import axios from "@/app/api/apiR";
import { getAuthUser, setAuthUser } from "@/src/helper/Storage";

import fechaActualString from "@/app/lib/funciones-auxiliares";
import fs from "fs";

import * as XLSX from "xlsx";

export default function IconLabelButtons({ exportData }) {
    //---------------------------------------------------------------------------------------------------------------
    const auth = getAuthUser();

    const idAlumno = auth.id;

    type petRetificacion = {
        cod_alumno: string;
        fecha: any;
        loading: boolean;
        err: string[] | null;
    };

    const [soli, setSoli] = useState<petRetificacion>({
        cod_alumno: "",
        fecha: Date(),
        loading: false,
        err: null, //err puede ser null o un [] String
    });

    const [modalVisible, setModalVisible] = useState(false);

    const abrirModal = () => {
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
    };

    const EnviarFormulario = async (e: { preventDefault: () => void }) => {
        //noStore();
        e.preventDefault();
        setSoli({
            ...soli,
            fecha: fechaActualString,
            loading: true,
            err: null,
        });
        await axios
            .post(
                `http://localhost:8080/api/alumno/rectificacion-solicitud?id=${idAlumno}`,
                {
                    /*cod_alumno: exportData.cod_alumno,
                apellidos:exportData.apellidos,
                nombres:exportData.nombres,
                plan_de_estudio:exportData.plan,
                situacion:exportData.situacion,*/

                    cod_alumno: exportData.codigo_alumno,
                    apellidos: exportData.apellidos_page,
                    nombres: exportData.nombres_page,
                    plan_de_estudio: exportData.plan_page,
                    situacion: exportData.situacion_page,
                    motivo_solicitud: "Cambio",
                    ingresos: [
                        {
                            codigo_curso: "cod_curso",
                            nombre: "",
                            grupo_a_ingresar: "",
                            grupo_a_ingresar_2daOp: "",
                            procede: "",
                        },
                    ],
                    retiros: [
                        {
                            codigo_curso_retiro: "",
                            nombre_retiro: "",
                            grupo_del_retiro: "",
                            procede: "",
                        },
                    ],
                    fecha: fechaActualString(),
                }
            )
            .then((resp) => {
                setSoli({ ...soli, loading: false, err: null });
                //console.log("mensaje de respuesta: ",resp.data.message);
                console.log("mensaje de respuesta 1: ", resp.data);

                //LANZAR UNA FUNCION DE VERIFICACION
                console.log("ENVIADO CORRECTAMENTE");

                cerrarModal();
                alert("¡Solicitud enviada!");
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

                if (
                    err.response.status === 400 ||
                    err.response.status === 422
                ) {
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
    };
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
            <Button
                type="submit"
                onClick={abrirModal}
                variant="contained"
                endIcon={<SendIcon />}
            >
                Enviar
            </Button>
            {modalVisible && (
                <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                    <div className="w-full max-w-md bg-white shadow-lg rounded-md px-5 py-4 relative">
                        <div className="my-8 text-center">
                            <h4 className="text-base font-semibold mt-4">
                                Solamente podra realizar una solicitud de
                                rectificacion. ¿Esta seguro/a de enviar su
                                solicitud?
                            </h4>
                        </div>
                        <div className="text-right space-x-4"></div>
                        <div className="flex flex-col space-y-4">
                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    EnviarFormulario(e);
                                }}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Enviar
                            </button>
                            <button
                                onClick={cerrarModal}
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Stack>
    );
}
