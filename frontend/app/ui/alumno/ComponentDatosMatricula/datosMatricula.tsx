"use client";
import { useEffect, useState } from "react";
import { getAuthUser } from "@/src/helper/Storage";
import axios from "@/app/api/apiR";

export default function DatosMatricula() {
    const auth = getAuthUser();

    const idAlumno = auth.id;
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
            })
            .catch((err) => {
                console.log(err);
                setInfoAlum({
                    ...infoAlum,
                    loading: false,
                    err: "Something Went Wrong",
                });
            });
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

        console.log(alumnoData);
    } */

    /*   const dataString = JSON.stringify(alumnoData);
    const dataParseada = JSON.parse(dataString);
    const infoAlumno = dataParseada[0];

    console.log(`Alumno data: ${JSON.stringify(infoAlumno)}`); */

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
                            value={
                                infoAlum.results[0] &&
                                infoAlum.results[0].plan_academico
                            }
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
                        value={
                            infoAlum.results[0] &&
                            `${infoAlum.results[0].apellido_paterno} ${infoAlum.results[0].apellido_materno}`
                        }
                        disabled
                    />
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p className="font-semibold">Situacion Academica</p>
                    <input
                        className="w-72 rounded-lg border-2 bg-sky-100"
                        type="text"
                        value={
                            infoAlum.results[0] &&
                            infoAlum.results[0].situ_academica
                        }
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
