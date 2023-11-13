import React, { useState } from 'react';
import "@/app/ui/alumno/tabla/Tabla.css";

export default function DetalleCursoTable ({ rowData }){
    if (!rowData) {
        return null; // Si no hay datos, no mostrar la tabla
    }

    // Encabezados de la nueva tabla
    const headers = ["Código del Curso", "Nombre", "Ciclo", "Número de Grupo", "Ingreso Opción 1", "Ingreso Opción 2"];

    return (
        <div>
            <h2>Detalles del Curso</h2>
            <table className="detalle-curso-table">
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{rowData.codigoCurso}</td>
                    <td>{rowData.nombre}</td>
                    <td>{rowData.ciclo}</td>
                    <td>{rowData.numeroGrupo}</td>
                    <td>{rowData.ingresoOpcion1}</td>
                    <td>{rowData.ingresoOpcion2}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};