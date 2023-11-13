import React, { useState } from 'react';
import "@/app/ui/alumno/tabla/Tabla.css";

export default function tablaAsignaturasRetiro ({rowData, type}){
    console.log(rowData);

    if (!rowData) {
        return null; // Si no hay datos, no mostrar la tabla
    }

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
                                <input
                                    type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"                                />
                            </td>
                            <td key={x++} className="shared-td">
                                <input
                                    type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </>
    );
};