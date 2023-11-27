import React, { useState,useEffect, useMemo } from 'react';
import "@/app/ui/alumno/tabla/Tabla.css";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import useDeepCompareEffect from 'use-deep-compare-effect';


export default function DetalleCursoTable ({rowData, type, cursosCambio}){


    useDeepCompareEffect(() => {
        console.log("rowDataCambio: ", rowData);
        cursosCambio(rowData);
    }, [rowData]);

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
                                    <TextField id="standard-basic" label="Opc 1" variant="standard" />
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
                                    <TextField id="standard-basic" label="Opc 2" variant="standard" />
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