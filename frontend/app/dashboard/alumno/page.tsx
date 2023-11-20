'use client'
import TextBlock from '@/app/ui/alumno/textBlock';
import TextInput from '@/app/ui/alumno/textInput';
import AlumnoTable from "@/app/ui/alumno/CursosAlumno";
import CursosAlumno from "@/app/ui/alumno/CursosAlumno";
import DatosMatricula from "@/app/ui/alumno/ComponentDatosMatricula/datosMatricula";
import IconLabelButtons from "@/app/ui/alumno/IconsLabelButton";
import { useEffect, useState } from "react";
import fechaActualString from "@/app/lib/funciones-auxiliares";

//FORMULARIO DE RECTIFICACION
export default function AlumnoPage(): React.JSX.Element {
    const [datosFormulario, setDatosFormulario] = useState({
        codigo_alumno: 'Alan',
        apellidos_page:"",
        nombres_page:"",
        plan_page:"",
        situacion_page:"",
        fecha: '',
    });

    const handleFormChange = (newData: { codigo: any; apellidos: any; nombres: any; plan: any; situacion: any; }) => {
        setDatosFormulario(({
            ...datosFormulario,
            codigo_alumno: newData.codigo,
            apellidos_page: newData.apellidos,
            nombres_page: newData.nombres,
            plan_page: newData.plan,
            situacion_page: newData.situacion,
        }));
    };
    //-----------------------------------------------------------------

    return (
            <>
                <DatosMatricula onFormChange={handleFormChange}  />
                <h1>
                    cod: {datosFormulario.codigo_alumno}
                    ape: {datosFormulario.apellidos_page}
                    nom: {datosFormulario.nombres_page}
                    plan: {datosFormulario.plan_page}
                    situ: {datosFormulario.situacion_page}
                </h1>

                <div className="container-fluid">
                    <CursosAlumno />
                    <div className="flex items-center justify-end p-4" style = {{marginRight: 90}}>
                        <IconLabelButtons exportData={datosFormulario}  />
                    </div>
                </div>

            </>

    );
}




