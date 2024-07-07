import React, { useState } from 'react';
import "@/app/ui/alumno/tabla/Tabla.css";
import useDeepCompareEffect from 'use-deep-compare-effect';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

/*
export default function TablaAsignaturasRetiro ({rowData, type, cursosRetiro}){
    // console.log(rowData);

    useDeepCompareEffect(() => {
        console.log("rowDataRetiro: ", rowData);
        cursosRetiro(rowData);
    }, [rowData]);

    // Encabezados de la nueva tabla
    const headers = ["Código del Curso", "Nombre", "Ciclo", "Número de Grupo"];
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
                        <th key="index" className="shared-th"></th>*/
    //                    {/* Encabezado vacío para índice */}
    //                    {column.map((data) => (
    //                        <th key={data} className="shared-th">
    //                            {data}
    //                        </th>
    //                    ))}
    //                    {/* {additionalHeaders.map((header) => (
    //                        <th key={header} className="shared-th">
    //                            {header}
    //                        </th>
    //                    ))} */}
    //                </tr>
    //                </thead>
    //                <tbody>
    //                {rowData.map((row,index) => (
    //                    <tr key={x++} className="shared-tr">
    //                        <td key={x++} className="shared-td">
    //                            {index + 1}
    //                        </td>
    //                        {column.map((v) => (
    //                            <td key={x++} className="shared-td">
    //                                {row[v]}
    //                            </td>
    //                        ))}
    //                        {/* <td key={x++} className="shared-td">
    //                            <input
    //                                type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"                                />
    //                        </td>
    //                        <td key={x++} className="shared-td">
    //                            <input
    //                                type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"
    //                            />
    //                        </td> */}
    //                    </tr>
    //                ))}
    //                </tbody>
    //            </table>
    //        </section>
    //    </>
    //);
//};






export default function TablaAsignaturasRetiro({ rowData, type, cursosRetiro }) {
    const [retiro, setRetiro] = useState(rowData.map(row => ({
        ...row,
        motivo: row.motivo || ""
    })));

    useDeepCompareEffect(() => {
        setRetiro(rowData.map(row => ({
            ...row,
            motivo: row.motivo || ""
        })));
    }, [rowData]);

    useDeepCompareEffect(() => {
        cursosRetiro(retiro);
    }, [retiro]);

    const changehandle = (e, index) => {
        const { name, value } = e.target;
        const updatedRetiro = [...retiro];
        updatedRetiro[index][name] = value;
        updatedRetiro[index]["tipo"] = "retiro";  // Añadir el tipo
        setRetiro(updatedRetiro);
    };

    const headers = ["Código del Curso", "Nombre", "Ciclo", "Número de Grupo"];
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
                            <th key={data} className="shared-th">
                                {data}
                            </th>
                        ))}
                        <th className="shared-th">Motivo</th>
                    </tr>
                </thead>
                <tbody>
                    {retiro.map((row, index) => (
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
                                    sx={{ '& > :not(style)': { m: 1, width: '5ch' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="standard-basic"
                                        label="Motivo"
                                        variant="standard"
                                        name="motivo"
                                        value={retiro[index].motivo}
                                        onChange={(e) => changehandle(e, index)}
                                    />
                                </Box>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
