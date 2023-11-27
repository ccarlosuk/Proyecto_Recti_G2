const { ingresoFormato, retiroFormato, cambioFormato } = require("./metodosTranformar");
const fs = require("fs");
const XLSX = require('xlsx');


const RectiRetiros = (filePathRetiros,jsonData) => {

    let workbookRetiros;
    const sheetName = 'Datos'; // Nombre de la hoja en el archivo Excel


    if (fs.existsSync(filePathRetiros)) {
        // Si el archivo existe, lo lee
        workbookRetiros = XLSX.readFile(filePathRetiros);
    } else {
        // Si el archivo no existe, crea un nuevo libro de trabajo y una hoja
        workbookRetiros = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbookRetiros, XLSX.utils.aoa_to_sheet([[]]), sheetName);
    }

    // Obtener la hoja de cálculo
    const worksheet = workbookRetiros.Sheets[sheetName];
    // Encabezados esperados
    const headersRoot = [
        "CÓDIGO DE ALUMNO",
        "APELLIDOS",
        "NOMBRES", 
        "PLAN DE ESTUDIOS",          
        "SITUACIÓN ACADÉMICA",
        "MOTIVO DE LA SOLICITUD",
        "CÓDIGO DE CURSO (SEGÚN EL SUM)",
        "NOMBRE DEL CURSO (SEGÚN EL SUM)",
        "GRUPO A INGRESAR" ,
        "GRUPO A INGRESAR 2DA OPCIÓN",
        "PROCEDE/NO PROCEDE",
        "CÓDIGO DE CURSO (SEGÚN EL SUM)",
        "NOMBRE DEL CURSO (SEGÚN EL SUM)",
        "GRUPO A RETIRARSE",
        "PROCEDE/NO PROCEDE",
        "OBSERVACIÓN"
    ];
    // Si no hay datos existentes, se agregan los encabezados
    if (!worksheet || !worksheet['!ref']) {
        // Fusionar celdas
        worksheet['!merges'] = [
            ...(worksheet['!merges'] || []), // Mantener las fusiones existentes
            { s: { r: 0, c: 6 }, e: { r: 0, c: 10 } }, // Fusión para 'Ingreso'
            { s: { r: 0, c: 11 }, e: { r: 0, c: 14 } } // Fusión para 'Retiro'
        ];
        const headers1 = ["INGRESO", "", "", "", "", "RETIRO"];
        const headerRow1 = headers1.map((header, index) => {
            const cellAddress = XLSX.utils.encode_cell({ c: 6 + index, r: 0 }); // Comienza en la columna G (c: 6)
            return { [cellAddress]: { t: 's', v: header, w: header } };
        }).reduce((prev, curr) => Object.assign(prev, curr), {});

        // Agregar los encabezados a la hoja de cálculo
        XLSX.utils.sheet_add_aoa(worksheet, [headers1], { origin: 'G1' });
        Object.assign(worksheet, headerRow1);


        const headerRow = headersRoot.map((header, index) => {
            const cellAddress = XLSX.utils.encode_cell({ c: index, r: 1 });
            return { [cellAddress]: { t: 's', v: header, w: header } };
        }).reduce((prev, curr) => Object.assign(prev, curr), {});

        // Agregar los encabezados a la hoja de cálculo
        XLSX.utils.sheet_add_aoa(worksheet, [headersRoot], { origin: 'A2' });
        Object.assign(worksheet, headerRow);
    }


    // Obtener la fila en la que se insertarán los nuevos datos
    let startingRow = XLSX.utils.decode_range(worksheet['!ref'] || 'A3').e.r + 1;

    retiroFormato(jsonData,startingRow,worksheet);


    // Escribir el libro de trabajo con los cambios en el archivo
    XLSX.writeFile(workbookRetiros, filePathRetiros);


};

const RectiIngresos = (filePathIngresos,jsonData) => {

    let workbookIngresos;
    const sheetName = 'Datos'; // Nombre de la hoja en el archivo Excel


    if (fs.existsSync(filePathIngresos)) {
        // Si el archivo existe, lo lee
        workbookIngresos = XLSX.readFile(filePathIngresos);
    } else {
        // Si el archivo no existe, crea un nuevo libro de trabajo y una hoja
        workbookIngresos = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbookIngresos, XLSX.utils.aoa_to_sheet([[]]), sheetName);
    }

    // Obtener la hoja de cálculo
    const worksheet = workbookIngresos.Sheets[sheetName];
    // Encabezados esperados
    const headersRoot = [
        "CÓDIGO DE ALUMNO",
        "APELLIDOS",
        "NOMBRES", 
        "PLAN DE ESTUDIOS",          
        "SITUACIÓN ACADÉMICA",
        "MOTIVO DE LA SOLICITUD",
        "CÓDIGO DE CURSO (SEGÚN EL SUM)",
        "NOMBRE DEL CURSO (SEGÚN EL SUM)",
        "GRUPO A INGRESAR" ,
        "GRUPO A INGRESAR 2DA OPCIÓN",
        "PROCEDE/NO PROCEDE",
        "CÓDIGO DE CURSO (SEGÚN EL SUM)",
        "NOMBRE DEL CURSO (SEGÚN EL SUM)",
        "GRUPO A RETIRARSE",
        "PROCEDE/NO PROCEDE",
        "OBSERVACIÓN"
    ];
    // Si no hay datos existentes, se agregan los encabezados
    if (!worksheet || !worksheet['!ref']) {
        // Fusionar celdas
        worksheet['!merges'] = [
            ...(worksheet['!merges'] || []), // Mantener las fusiones existentes
            { s: { r: 0, c: 6 }, e: { r: 0, c: 10 } }, // Fusión para 'Ingreso'
            { s: { r: 0, c: 11 }, e: { r: 0, c: 14 } } // Fusión para 'Retiro'
        ];
        const headers1 = ["INGRESO", "", "", "", "", "RETIRO"];
        const headerRow1 = headers1.map((header, index) => {
            const cellAddress = XLSX.utils.encode_cell({ c: 6 + index, r: 0 }); // Comienza en la columna G (c: 6)
            return { [cellAddress]: { t: 's', v: header, w: header } };
        }).reduce((prev, curr) => Object.assign(prev, curr), {});

        // Agregar los encabezados a la hoja de cálculo
        XLSX.utils.sheet_add_aoa(worksheet, [headers1], { origin: 'G1' });
        Object.assign(worksheet, headerRow1);


        const headerRow = headersRoot.map((header, index) => {
            const cellAddress = XLSX.utils.encode_cell({ c: index, r: 1 });
            return { [cellAddress]: { t: 's', v: header, w: header } };
        }).reduce((prev, curr) => Object.assign(prev, curr), {});

        // Agregar los encabezados a la hoja de cálculo
        XLSX.utils.sheet_add_aoa(worksheet, [headersRoot], { origin: 'A2' });
        Object.assign(worksheet, headerRow);
    }


    // Obtener la fila en la que se insertarán los nuevos datos
    let startingRow = XLSX.utils.decode_range(worksheet['!ref'] || 'A3').e.r + 1;

    ingresoFormato(jsonData,startingRow,worksheet);


    // Escribir el libro de trabajo con los cambios en el archivo
    XLSX.writeFile(workbookIngresos, filePathIngresos);

    
};

const RectiCambios = (filePathCambios,jsonData) => {

    let workbookCambios;
    const sheetName = 'Datos'; // Nombre de la hoja en el archivo Excel


    if (fs.existsSync(filePathCambios)) {
        // Si el archivo existe, lo lee
        workbookCambios = XLSX.readFile(filePathCambios);
    } else {
        // Si el archivo no existe, crea un nuevo libro de trabajo y una hoja
        workbookCambios = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbookCambios, XLSX.utils.aoa_to_sheet([[]]), sheetName);
    }

    // Obtener la hoja de cálculo
    const worksheet = workbookCambios.Sheets[sheetName];
    // Encabezados esperados
    const headersRoot = [
        "CÓDIGO DE ALUMNO",
        "APELLIDOS",
        "NOMBRES", 
        "PLAN DE ESTUDIOS",          
        "SITUACIÓN ACADÉMICA",
        "MOTIVO DE LA SOLICITUD",
        "CÓDIGO DE CURSO (SEGÚN EL SUM)",
        "NOMBRE DEL CURSO (SEGÚN EL SUM)",
        "GRUPO A INGRESAR" ,
        "GRUPO A INGRESAR 2DA OPCIÓN",
        "PROCEDE/NO PROCEDE",
        "CÓDIGO DE CURSO (SEGÚN EL SUM)",
        "NOMBRE DEL CURSO (SEGÚN EL SUM)",
        "GRUPO A RETIRARSE",
        "PROCEDE/NO PROCEDE",
        "OBSERVACIÓN"
    ];
    // Si no hay datos existentes, se agregan los encabezados
    if (!worksheet || !worksheet['!ref']) {
        // Fusionar celdas
        worksheet['!merges'] = [
            ...(worksheet['!merges'] || []), // Mantener las fusiones existentes
            { s: { r: 0, c: 6 }, e: { r: 0, c: 10 } }, // Fusión para 'Ingreso'
            { s: { r: 0, c: 11 }, e: { r: 0, c: 14 } } // Fusión para 'Retiro'
        ];
        const headers1 = ["INGRESO", "", "", "", "", "RETIRO"];
        const headerRow1 = headers1.map((header, index) => {
            const cellAddress = XLSX.utils.encode_cell({ c: 6 + index, r: 0 }); // Comienza en la columna G (c: 6)
            return { [cellAddress]: { t: 's', v: header, w: header } };
        }).reduce((prev, curr) => Object.assign(prev, curr), {});

        // Agregar los encabezados a la hoja de cálculo
        XLSX.utils.sheet_add_aoa(worksheet, [headers1], { origin: 'G1' });
        Object.assign(worksheet, headerRow1);


        const headerRow = headersRoot.map((header, index) => {
            const cellAddress = XLSX.utils.encode_cell({ c: index, r: 1 });
            return { [cellAddress]: { t: 's', v: header, w: header } };
        }).reduce((prev, curr) => Object.assign(prev, curr), {});

        // Agregar los encabezados a la hoja de cálculo
        XLSX.utils.sheet_add_aoa(worksheet, [headersRoot], { origin: 'A2' });
        Object.assign(worksheet, headerRow);
    }


    // Obtener la fila en la que se insertarán los nuevos datos
    let startingRow = XLSX.utils.decode_range(worksheet['!ref'] || 'A3').e.r + 1;

    cambioFormato(jsonData,startingRow,worksheet);


    // Escribir el libro de trabajo con los cambios en el archivo
    XLSX.writeFile(workbookCambios, filePathCambios);


};

module.exports = {
    RectiIngresos,
    RectiRetiros,
    RectiCambios,

}