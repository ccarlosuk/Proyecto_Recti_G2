import TextBlanck from '@/app/ui/alumno/textBlock';
import TextInput from '@/app/ui/alumno/textInput';
import AlumnoTable from "@/app/ui/alumno/CursosAlumno";
import CursosAlumno from "@/app/ui/alumno/CursosAlumno";
export default function AlumnoPage(): React.JSX.Element {
    return (
            <>

                <div className="container grid grid-cols-1 sm:grid-cols-2 ">

                    <div className="container grid grid-cols-1 sm:grid-cols-2 " style={{ padding: 10 }}>
                        <div className="container">
                            <p>Código</p>
                            <TextBlanck />
                        </div>
                        <div className="container">
                            <p>Plan de Estudio</p>
                            <TextBlanck />
                        </div>
                    </div>

                    <div className="container" style={{ padding: 10 }}>
                        <p>Escuela Académica</p>
                        <TextBlanck />
                    </div>
                    <div className="container" style={{ padding: 10 }}>
                        <p>Rectificacion del alumno Page</p>
                        <TextBlanck />
                    </div>
                    <div className="container" style={{ padding: 10 }}>
                        <p>Rectificacion del alumno Page</p>
                        <TextBlanck />
                    </div>
                    <div className="container" style={{ padding: 10 }}>
                        <p>Rectificacion del alumno Page</p>
                        <TextBlanck />
                    </div>
                    <div className="container" style={{ padding: 10 }}>
                        <p>Rectificacion del alumno Page</p>
                        <TextBlanck />
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


                <div>
                    <CursosAlumno />
                </div>

            </>

    );
}




