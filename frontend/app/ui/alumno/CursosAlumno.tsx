'use client';
import "@/app/ui/alumno/styles/CursosAlumno.css";
import DynamicTable from "@/app/ui/alumno/tabla/tablaDinamica";
import React, { useState, useEffect } from "react";
//import axios from "axios";
import { getAuthUser } from "@/src/helper/Storage";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";

import axios from "@/app/api/apiR";
import {TableDataItem} from "@/app/lib/fomat-table";

import './DynamicTable.css';
import RadioButtons from "@/app/ui/alumno/buttonGroup"; // Importar el archivo de estilos CSS


export default function StudentCourse(){

    //let { code } = useParams();

    //OBTENER AL USUARIO DESDE LA COOKIES DEL CLIENTE
    const auth = getAuthUser();
    //const userNameAlumno = auth.username;
    const userNameAlumno = "patrick.monzon";
    console.log("getAuthUser: "+ auth);
    const [courses, setCourses] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });
    useEffect(() => {
        setCourses({ ...courses, loading: true });
        //console.log("Token: " + auth.token);
        axios
            .get(`http://localhost:8080/api/alumno/cursos-matriculados?user=${userNameAlumno}`)
            .then((resp) => {
                setCourses({ ...courses, results: resp.data, loading: false });
            })
            .catch((err) => {
                console.log(err);
                setCourses({
                    ...courses,
                    loading: false,
                    err: "Something Went Wrong",
                });
            });
    }, [courses.reload]);
    console.log("lista de cursos: " + courses.results.length);


    const TableData:TableDataItem[] = courses.results.map((obj) => {
        return {
            cod_asignatura:obj.cod_asignatura,
            nombre: obj.nombre,
            ciclo_asignatura: obj.ciclo_asignatura,
            id_seccion: obj.id_seccion
        };
    });

    return (
        <>
            {courses.loading === false &&
                courses.err === null &&
                Array.isArray(courses.results) && (
                //DynamicTable(TableData, courses.results[0].cod_asignatura)}
                //DynamicTable(TableData, "Asignaturas Matriculadas",checkedRows,setCheckedRows)}
                <DynamicTable TableData={TableData}
                              type="Asignaturas Matriculadas"
                              />
                )}

            {courses.loading === false &&
                courses.err == null &&
                !Array.isArray(courses.results) &&
                courses.results && (
                    <Alert
                        variant="info"
                        style={{
                            width: "50%",
                            margin: "5% auto",
                            textAlign: "center",
                        }}
                    >
                        {courses.results}
                    </Alert>
                )}

            {courses.loading === false && courses.err != null && (
                <>
                    {" "}
                    <Alert
                        key="danger"
                        variant="danger"
                        style={{
                            width: "50%",
                            margin: "5% auto",
                            zIndex: "-1",
                            textAlign: "center",
                        }}
                    >
                        {courses.err}
                    </Alert>
                    <br />
                    <button className="showbtn" onClick={(e) => window.location.reload()}>
                        Back
                    </button>
                    <br />
                    <br />
                </>
            )}

        </>
    );
};
