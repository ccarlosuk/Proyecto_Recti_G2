// Obtener la fecha actual en formato 'YYYY-MM-DD' (por ejemplo, '2023-11-19')
export default function fechaActualString() {
    return new Date().toISOString().split('T')[0];
}



export function Formato (datosFormulario) {
    if (datosFormulario.estado === "cambio"){
        return {
            
            //         codigo_curso: "",
            //         nombre: "",
            //         grupo_a_ingresar: "",
            //         grupo_a_ingresar_2daOp: "",
            //         procede: "",
            //     
            
        }
    }
    if (datosFormulario.estado === "retiro"){
        return {
            codigo_curso_retiro: "",
            nombre_retiro: "",
            grupo_del_retiro: "",
            procede: "",
        }
    }
    if (datosFormulario.estado === "ingreso"){

    }
}





/*
export function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}*/
