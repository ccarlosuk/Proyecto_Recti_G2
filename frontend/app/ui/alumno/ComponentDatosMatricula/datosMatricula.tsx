'use client';
import {useEffect, useState} from "react";
import {TableDataItem} from "@/app/lib/fomat-table";
import TextBlock from "@/app/ui/alumno/textBlock";
import TextInput from "@/app/ui/alumno/textInput";
import {getAuthUser} from "@/src/helper/Storage";
import axios from "axios";


export default function DatosMatricula() {

    const [infoAlum, setInfoAlum] = useState({
        loading: true,
        results: [], //aqui va ir id, []AlumnoDatos
        err: null,
        reload: 0,
    });
    //FUNCION PARA RECUPERAR LOS DATOS DEL ESTUDIANTE MEDIANTE
    //SOLICITUD GET AL SERVIDOR
    const auth = getAuthUser();
    const idAlumno = auth.id;
    console.log("getAuthUser: "+ auth);

    useEffect(() => {
        setInfoAlum({ ...infoAlum, loading: true });
        axios.get(`http://localhost:8080/api/alumno/datos-alumno?id=${idAlumno}`)
        .then((resp) => {
            setInfoAlum({ ...infoAlum, results: resp.data, loading: false });
        })
        .catch((err) => {
            console.log(err);
            setInfoAlum({
                ...infoAlum,
                loading: false,
                err: "Something Went Wrong",
            });
        });

    },[infoAlum.reload]);




    //MAPEAR LOS DATOS
    const alumnoData = infoAlum.results.map((obj) => {
        console.log("RESULTS: " + infoAlum.results );
        return {
            /*cod_asignatura:obj.cod_asignatura,
            nombre: obj.nombre,
            ciclo_asignatura: obj.ciclo_asignatura,
            id_seccion: obj.id_seccion*/
        };
    });

    return (
        <>
            <div className="container grid grid-cols-1 sm:grid-cols-2 ">

                <div className="container grid grid-cols-1 sm:grid-cols-2 " style={{ padding: 10 }}>
                    <div className="container">
                        <p>Código</p>
                        <TextBlock />
                    </div>
                    <div className="container">
                        <p>Plan de Estudio</p>
                        <TextBlock />
                    </div>
                </div>

                <div className="container" style={{ padding: 10 }}>
                    <p>Escuela Académica</p>
                    <TextBlock />
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p>Rectificacion del alumno Page</p>
                    <TextBlock />
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p>Rectificacion del alumno Page</p>
                    <TextBlock />
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p>Rectificacion del alumno Page</p>
                    <TextBlock />
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p>Rectificacion del alumno Page</p>
                    <TextBlock />
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p>Promedio Ponderado</p>
                    <TextInput/>
                </div>
                <div className="container" style={{ padding: 10 }}>
                    <p>Número Teléfonico</p>
                    <TextInput />
                </div>
            </div>
        </>
    );
}