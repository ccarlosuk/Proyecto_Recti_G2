"use client";
import { useEffect, useRef, useState } from "react";
import { getAuthUser } from "@/src/helper/Storage";
import axios from "@/app/api/apiR";
import { TableAlumnoData } from "@/app/lib/fomat-table";

export default function DatosMatricula({ onFormChange }) {
    const [codigo, setCodigo] = useState("");
    const [apellidos_hook, setApellidos] = useState("");
    const [nombres_hook, setNombres] = useState("");
    const [plan_hook, setPlan] = useState("");
    const [situacion_hook, setSituacion] = useState("");

    const auth = getAuthUser();

    const idAlumno = auth.id;
    const idAlumno = auth.id;
    //const idAlumno = 17200237;
    // console.log("getAuthUser: " + auth);

    const [infoAlum, setInfoAlum] = useState({
        loading: true,
        results: [""],
        err: null,
    });

    useEffect(() => {
        //setInfoAlum({ ...infoAlum, loading: true });
        axios
            .get(`http://localhost:8080/api/alumno/datos-alumno?id=${idAlumno}`)
            .then((resp) => {
                setInfoAlum({
                    ...infoAlum,
                    results: resp.data.alumno,
                    loading: false,
                });
                const alumnoData = resp.data.alumno[0];
                //console.log("ALUMNODATA:", alumnoData.cod_alumno);
                console.log("ALUMNODATA:", alumnoData);

                // Actualiza los estados con los valores iniciales
                //FUNCIONA!!!!!!!!
                setCodigo(alumnoData.cod_alumno || "");
                setApellidos(
                    alumnoData.apellido_paterno +
                        " " +
                        alumnoData.apellido_materno || ""
                );
                setNombres(alumnoData.nombre || "");
                setPlan(alumnoData.plan_academico || "");
                setSituacion(alumnoData.situ_academica || "");

                // Llama a la función proporcionada para informar al componente padre
                onFormChange({
                    //FUNCIONA!!!!!
                    codigo: alumnoData.cod_alumno || "",
                    apellidos:
                        alumnoData.apellido_paterno +
                            " " +
                            alumnoData.apellido_materno || "",
                    nombres: alumnoData.nombre || "",
                    plan: alumnoData.plan_academico || "",
                    situacion: alumnoData.situ_academica || "",
                    // Agrega otros campos según sea necesario
                });
            })
            .catch((err) => {
                console.log(err);
                setInfoAlum({
                    ...infoAlum,
                    loading: false,
                    err: "Something Went Wrong",
                });
            });
        console.log("AXIOS TERMINADO");
    }, []);

    //console.log(JSON.stringify(infoAlum.results));

    /*     //MAPEAR LOS DATOS
    if (infoAlum.results[0]) {
        const alumnoData = infoAlum.results.map((obj) => {
            return {
                cod_alumno: obj.cod_alumno,
                plan_academico: obj.plan_academico,
                escuela: obj.escuela,
                nombre: obj.nombre,
                apellidos: obj.apellido_paterno + obj.apellido_materno,
                situ_academica: obj.situ_academica,
                correo: obj.correo,
            };
        });

    } else {
        console.log("El array alumnoData está vacío");
    }

    /*   const dataString = JSON.stringify(alumnoData);
    const dataParseada = JSON.parse(dataString);
    const infoAlumno = dataParseada[0];

    console.log(`Alumno data: ${JSON.stringify(infoAlumno)}`); */

    // Agrega funciones onChange para cada campo del formulario
    /*const handleCodigoChange = (event) => {
        setCodigo(event.target.value);
        onFormChange({codigo: event.target.value});
    }*/
    /*const handleApellidosChange = (event) => {
        setApellidos(event.target.value);
        onFormChange({apellidos: event.target.value});
    }
    const handleNombresChange = (event) => {
        setNombres(event.target.value);
        onFormChange({nombres_page: event.target.value});
    }
    const handlePlanChange = (event) => {
        setPlan(event.target.value);
        onFormChange({plan: event.target.value});
    }
    const handleSituacionChange = (event) => {
        setSituacion(event.target.value);
        onFormChange({situacion: event.target.value});
    }*/
    return (
        <>
            <div className="container grid grid-cols-1 sm:grid-cols-2 ">
                <div
                    className="container grid grid-cols-1 sm:grid-cols-2 "
                    style={{ padding: 10 }}
                >
                    <div className="container">
                        <p className="font-semibold">Código</p>
                        <input
                            className="w-32 rounded-lg text-center border-2 bg-sky-100"
                            type="text"
                            value={
                                infoAlum.results[0] &&
                                infoAlum.results[0].cod_alumno
                            }
                            disabled
                        />
                    </div>
                    <div className="container">
                        <p className="font-semibold">Plan de Estudio</p>
                        <input
                            className="w-32 rounded-lg text-center border-2 bg-sky-100"
                            type="text"
                            value={plan_hook}
                            disabled
                        />
                    </div>
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p className="font-semibold">Escuela Academica</p>
                    <input
                        className="w-72 rounded-lg border-2 bg-sky-100"
                        type="text"
                        value={
                            infoAlum.results[0] && infoAlum.results[0].escuela
                        }
                        disabled
                    />
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p className="font-semibold">Nombres</p>
                    <input
                        className="w-72 rounded-lg border-2 bg-sky-100"
                        type="text"
                        value={
                            infoAlum.results[0] && infoAlum.results[0].nombre
                        }
                        disabled
                    />
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p className="font-semibold">Apellidos</p>
                    <input
                        className="w-72 rounded-lg border-2 bg-sky-100"
                        type="text"
                        value={apellidos_hook}
                        disabled
                    />
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p className="font-semibold">Situacion Academica</p>
                    <input
                        className="w-72 rounded-lg border-2 bg-sky-100"
                        type="text"
                        value={situacion_hook}
                        disabled
                    />
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p className="font-semibold">Correo electronico</p>
                    <input
                        className="w-72 rounded-lg border-2 bg-sky-100"
                        type="text"
                        value={
                            infoAlum.results[0] && infoAlum.results[0].correo
                        }
                        disabled
                    />
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p className="font-semibold">Promedio Ponderado</p>
                    <input
                        className="w-72 rounded-lg border-2"
                        type="number"
                        autoFocus
                    />
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p className="font-semibold">Número Teléfonico</p>
                    <input className="w-72 rounded-lg border-2" type="tel" />
                </div>
            </div>
        </>
    );
}
