import React, { useState,useEffect, useMemo } from 'react';
import "@/app/ui/alumno/tabla/Tabla.css";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import useDeepCompareEffect from 'use-deep-compare-effect';


export default function DetalleCursoTable ({rowData, type, cursosCambio}){
    

    //matriz que se devuelve al page alumno
    const [miMatriz, setMiMatriz] = useState([[{}],[{}]]);

    // const dataIngreso ={
    //     cod: "",
    //     name: "",
    //     opc1: "",
    //     opc2: "",
    //     estado:"",
    // }
    // const [ingreso, setIngreso] = useState([
    //     dataIngreso,
    //     dataIngreso,
    //     dataIngreso,
    // ]);
    const [ingreso, setIngreso] = useState([
        {
            cod: "",
            name: "",
            opc1: "",
            opc2: "",
            estado:"",
        },
        {
            cod: "",
            name: "",
            opc1: "",
            opc2: "",
            estado:"",
        },
        {
            cod: "",
            name: "",
            opc1: "",
            opc2: "",
            estado:"",
        },
    ]);

    
    useDeepCompareEffect(() => {
        
        setMiMatriz([rowData,ingreso]);
        cursosCambio(miMatriz);

        console.log("MatrizCambio: ", miMatriz);
        console.log("matriz: ", miMatriz[0].length,"rowdata: ", rowData.length);
    }, [rowData,miMatriz]);//[changehandle2]);


    // useDeepCompareEffect(() => {
    //     console.log("MatrizCambio UseDeepCompareEffect: ", miMatriz);
    //     console.log("matriz: ", miMatriz[0].length,"rowdata: ", rowData.length);

    //     if (miMatriz.length > rowData.length) {
    //         const idsRowData = new Set(rowData.map(item => item.cod_asignatura));
    //         console.log("idsRowData: ", idsRowData);
    //         //const nuevaMatriz = miMatriz.filter(item => idsRowData.has(item.cod_asignatura));
    //         //cursosCambio(nuevaMatriz);
    //     }
    // },[rowData]);

    const changehandle2 = (e, index) => {

        let ingresoModificado = [...ingreso]; // Hacer una copia del estado actual
        ingresoModificado[index].cod = rowData[index].cod_asignatura; // Modificar el cod del primer objeto
        ingresoModificado[index].name = rowData[index].nombre; // Modificar el name del primer objeto
        ingresoModificado[index][e.target.name] = e.target.value; ; // Modificar el opc1 del primer objeto
        setIngreso(ingresoModificado); // Actualizar el estado
        setMiMatriz([rowData,ingreso]);
        //cursosCambio(miMatriz);
        //console.log("MatrizCambio: ", miMatriz);
        
    };
    
    // Encabezados de la nueva tabla
    const headers = ["Código del Curso", "Nombre", "Ciclo", "Número de Grupo", "Ingreso Opción 1", "Ingreso Opción 2"];
    const column: string[] = rowData && rowData.length > 0 ? Object.keys(rowData[0]) : [];

    let x=0;
    const additionalHeaders = ["Opcion 1", "Opcion 2"]; // Nuevos encabezados

    return (
        <>
            <section className="sec">
                <div id="shared-table-p">
                    {typeof type === "string" ? type.charAt(0).toUpperCase() + type.slice(1) : ""}
                </div>
                <table className="shared-table" id="myTable">
                    <thead>
                       <tr className="shared-tr">
                           <th key="index" className="shared-th"></th>
                           {/* Encabezado vacío para índice */}
                           {column.map((data) => (
                               <th key={data} className="shared-th">
                                   {data}
                               </th>
                           ))}
                           {additionalHeaders.map((header) => (
                               <th key={header} className="shared-th">
                                   {header}
                               </th>
                           ))}
                       </tr>
                    </thead>
                    <tbody>
                    {rowData.map((row,index) => (
                        <tr key={x++} className="shared-tr">
                            <td key={x++} className="shared-td">
                                {index + 1}
                            </td>
                            {column.map((v) => (
                                <td key={x++} className="shared-td">
                                    {row[v]}
                                </td>
                            ))}
                            <td key={x++} className="shared-td">
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '5ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField 
                                        id="standard-basic" 
                                        label="Opc 1" 
                                        variant="standard"
                                        name = 'opc1'
                                        value = {ingreso[index].opc1}
                                        onChange={(e) => changehandle2(e, index)} 
                                    />
                                </Box>

                            </td>
                            <td key={x++} className="shared-td">
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '5ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField 
                                        id="standard-basic" 
                                        label="Opc 2" 
                                        variant="standard" 
                                        name = 'opc2'
                                        value = {ingreso[index].opc2}
                                        onChange={(e) => changehandle2(e, index)}
                                    />
                                </Box>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </>
    );
};