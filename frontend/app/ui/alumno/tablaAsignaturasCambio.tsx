import React, { useState,useEffect, useMemo } from 'react';
import "@/app/ui/alumno/tabla/Tabla.css";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import useDeepCompareEffect from 'use-deep-compare-effect';





/*export default function DetalleCursoTable({ rowData, type, cursosCambio }) {
    const [miMatriz, setMiMatriz] = useState([[{}], [{}]]);
    const [ingreso, setIngreso] = useState(Array(3).fill({
        cod: "",
        name: "",
        opc1: "",
        opc2: "",
        motivo: "", // Añadido motivo aquí
        estado: "",
    }));

    useDeepCompareEffect(() => {
        const nuevaMatriz = [rowData, ingreso];
        setMiMatriz(nuevaMatriz);
        cursosCambio(nuevaMatriz);
    }, [rowData, ingreso]);

    const changehandle2 = (e, index) => {
        const { name, value } = e.target;
        const updatedIngreso = [...ingreso];
        updatedIngreso[index] = {
            ...updatedIngreso[index],
            [name]: value,
            cod: rowData[index]?.cod_asignatura || updatedIngreso[index].cod,
            name: rowData[index]?.nombre || updatedIngreso[index].name,
        };
        setIngreso(updatedIngreso);
    };

    const headers = ["Código del Curso", "Nombre", "Ciclo", "Número de Grupo", "Ingreso Opción 1", "Ingreso Opción 2", "Motivo"]; // Añadido "Motivo"
    const column = rowData && rowData.length > 0 ? Object.keys(rowData[0]) : [];
    let x = 0;

    return (
        <section className="sec">
            <div id="shared-table-p">
                {typeof type === "string" ? type.charAt(0).toUpperCase() + type.slice(1) : ""}
            </div>
            <table className="shared-table" id="myTable">
                <thead>
                    <tr className="shared-tr">
                        <th key="index" className="shared-th"></th>
                        {column.map((data) => (
                            <th key={data} className="shared-th">{data}</th>
                        ))}
                        {headers.slice(4).map((header) => (
                            <th key={header} className="shared-th">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rowData.map((row, index) => (
                        <tr key={x++} className="shared-tr">
                            <td key={x++} className="shared-td">{index + 1}</td>
                            {column.map((v) => (
                                <td key={x++} className="shared-td">{row[v]}</td>
                            ))}
                            {["opc1", "opc2", "motivo"].map((field) => (
                                <td key={x++} className="shared-td">
                                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '5ch' } }} noValidate autoComplete="off">
                                        <TextField
                                            id="standard-basic"
                                            label={field === "motivo" ? "Motivo" : `Opc ${field.slice(-1)}`}
                                            variant="standard"
                                            name={field}
                                            value={ingreso[index][field]}
                                            onChange={(e) => changehandle2(e, index)}
                                        />
                                    </Box>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}*/




export default function DetalleCursoTable({ rowData, type, cursosCambio }) {
    const [miMatriz, setMiMatriz] = useState([[{}], [{}]]);
    const [cambio, setCambio] = useState(Array(3).fill({
        cod_asignatura: "",
        nombre_asignatura: "",
        opc1: "",
        opc2: "",
        motivo: "",
        estado: "",
    }));

    useDeepCompareEffect(() => {
        const nuevaMatriz = [rowData, cambio];
        setMiMatriz(nuevaMatriz);
        cursosCambio(nuevaMatriz);
    }, [rowData, cambio]);

    const changehandle2 = (e, index) => {
        const { name, value } = e.target;
        const updatedCambio = [...cambio];
        updatedCambio[index] = {
            ...updatedCambio[index],
            [name]: value,
            cod_asignatura: rowData[index]?.cod_asignatura || updatedCambio[index].cod_asignatura,
            nombre_asignatura: rowData[index]?.nombre_asignatura || updatedCambio[index].nombre_asignatura,
            tipo: "cambio"  // Añadir el tipo
        };
        setCambio(updatedCambio);
    };

    const headers = ["Código del Curso", "Nombre", "Ciclo", "Número de Grupo", "Ingreso Opción 1", "Ingreso Opción 2", "Motivo"];
    const column = rowData && rowData.length > 0 ? Object.keys(rowData[0]) : [];
    let x = 0;

    return (
        <section className="sec">
            <div id="shared-table-p">
                {typeof type === "string" ? type.charAt(0).toUpperCase() + type.slice(1) : ""}
            </div>
            <table className="shared-table" id="myTable">
                <thead>
                    <tr className="shared-tr">
                        <th key="index" className="shared-th"></th>
                        {column.map((data) => (
                            <th key={data} className="shared-th">{data}</th>
                        ))}
                        {headers.slice(4).map((header) => (
                            <th key={header} className="shared-th">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rowData.map((row, index) => (
                        <tr key={x++} className="shared-tr">
                            <td key={x++} className="shared-td">{index + 1}</td>
                            {column.map((v) => (
                                <td key={x++} className="shared-td">{row[v]}</td>
                            ))}
                            {["opc1", "opc2", "motivo"].map((field) => (
                                <td key={x++} className="shared-td">
                                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '5ch' } }} noValidate autoComplete="off">
                                        <TextField
                                            id="standard-basic"
                                            label={field === "motivo" ? "Motivo" : `Opc ${field.slice(-1)}`}
                                            variant="standard"
                                            name={field}
                                            value={cambio[index][field]}
                                            onChange={(e) => changehandle2(e, index)}
                                        />
                                    </Box>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}



