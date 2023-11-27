const XLSX = require('xlsx');

const retiroFormato = (jsonData,startingRow,worksheet) => {

    // Asegurarse de que el objeto es un array
    if (!Array.isArray(jsonData)) {
        jsonData = [jsonData];
    }

    // Iterar sobre el array retiros y crear un nuevo objeto para cada retiro
    for (let i = 0; i < jsonData[0].retiros.length; i++) {
        let data = {
            cod_alumno: jsonData[0].cod_alumno,
            apellidos: jsonData[0].apellidos,
            nombres: jsonData[0].nombres,
            plan_de_estudio: jsonData[0].plan_de_estudio,
            situacion: jsonData[0].situacion,
            motivo_solicitud: jsonData[0].motivo_solicitud,
            
            ingreso1:"",
            ingreso2:"",
            ingreso3:"",
            ingreso4:"",
            ingreso5:"",
            
            cod_asignatura: jsonData[0].retiros[i].cod_asignatura,
            nombre: jsonData[0].retiros[i].nombre,
            id_seccion: jsonData[0].retiros[i].id_seccion,
        };

        // Agregar los datos a la hoja de cálculo a partir de la fila especificada
        XLSX.utils.sheet_add_json(worksheet, [data], { skipHeader: true, origin: startingRow + i });
    }
}
const cambioFormato = (jsonData,startingRow,worksheet) => {

    console.log("cambioFormato:",jsonData);
    // Asegurarse de que el objeto es un array
    if (!Array.isArray(jsonData)) {
        jsonData = [jsonData];
    }

    // Iterar sobre el array retiros y crear un nuevo objeto para cada ingreso
    for (let i = 0; i < jsonData[0].cambios[0].length; i++) {
        let data = {
            cod_alumno: jsonData[0].cod_alumno,
            apellidos: jsonData[0].apellidos,
            nombres: jsonData[0].nombres,
            plan_de_estudio: jsonData[0].plan_de_estudio,
            situacion: jsonData[0].situacion,
            motivo_solicitud: jsonData[0].motivo_solicitud,

            //INGRESOS
            cod_asignatura: jsonData[0].cambios[1][i].cod,
            nombre: jsonData[0].cambios[1][i].name,
            grupo_opcion1: jsonData[0].cambios[1][i].opc1,
            grupo_opcion2: jsonData[0].cambios[1][i].opc2,
            estado:jsonData[0].cambios[1][i].estado,// PROCEDE/NO PROCEDE

            //RETIROS
            cod_asignatura_re: jsonData[0].cambios[0][0].cod_asignatura,
            nombre_re: jsonData[0].cambios[0][i].nombre,
            id_seccion_re: jsonData[0].cambios[0][i].id_seccion,
            estado_re: "",// PROCEDE/NO PROCEDE
            observacion: "",//OBSERVACIÓN
        };

        // Agregar los datos a la hoja de cálculo a partir de la fila especificada
        XLSX.utils.sheet_add_json(worksheet, [data], { skipHeader: true, origin: startingRow + i });
    }
}



const ingresoFormato = (jsonData,startingRow,worksheet) => {

    // Asegurarse de que el objeto es un array
    if (!Array.isArray(jsonData)) {
        jsonData = [jsonData];
    }

    // Iterar sobre el array retiros y crear un nuevo objeto para cada ingreso
    for (let i = 0; i < jsonData[0].ingresos.length; i++) {
        let data = {
            cod_alumno: jsonData[0].cod_alumno,
            apellidos: jsonData[0].apellidos,
            nombres: jsonData[0].nombres,
            plan_de_estudio: jsonData[0].plan_de_estudio,
            situacion: jsonData[0].situacion,
            motivo_solicitud: jsonData[0].motivo_solicitud,

            
            cod_asignatura: jsonData[0].cambios[i].rollNo,
            nombre: jsonData[0].ingresos[i].name,
            grupo_opcion1: jsonData[0].ingresos[i].opc1,
            grupo_opcion2: jsonData[0].ingresos[i].opc2,
            estado:"",// PROCEDE/NO PROCEDE


        };

        // Agregar los datos a la hoja de cálculo a partir de la fila especificada
        XLSX.utils.sheet_add_json(worksheet, [data], { skipHeader: true, origin: startingRow + i });
    }
}

module.exports = {
    retiroFormato,
    ingresoFormato,
    cambioFormato,
}