import TextBlock from '@/app/ui/alumno/textBlock';
import TextInput from '@/app/ui/alumno/textInput';
import AlumnoTable from "@/app/ui/alumno/CursosAlumno";
import CursosAlumno from "@/app/ui/alumno/CursosAlumno";
import DatosMatricula from "@/app/ui/alumno/ComponentDatosMatricula/datosMatricula";


export default function AlumnoPage(): React.JSX.Element {
    return (
            <>
                <DatosMatricula />


                <div className="container-fluid">
                    <CursosAlumno />
                </div>

            </>

    );
}




