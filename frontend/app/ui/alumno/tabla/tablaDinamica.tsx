import "@/app/ui/alumno/tabla/Tabla.css";
import {Tabla, TableDataItem} from "@/app/lib/fomat-table";
import DetalleCursoTable from "@/app/ui/alumno/tablaAsignaturasCambio";
import React, { useState } from "react";
import TablaAsignaturasRetiro from "@/app/ui/alumno/tablaAsignaturasRetiro";
export default function DynamicTable ({
                                          TableData, type,
                                      })
{
    //A cambiar
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    //A retirar
    const [selectedRowsRetiro, setSelectedRowsRetiro] = useState<any[]>([]);
    const [selectedRowsCambio, setSelectedRowsCambio] = useState<any[]>([]);
    //PARA MANEJAR EL RENDER DE TABLA DINAMICA
    const [checkedRows, setCheckedRows] = useState<any[]>([]);




    // get table column
    const column = Object.keys(TableData[0]);
    //const column = TableData.length > 0 ? Object.keys(TableData[0]) : [];

    // get table heading data
    const ThData = () => {
        const additionalHeaders = ["Cambio", "Retiro"]; // Nuevos encabezados
        return (
            <>
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
            </>
        );
    };

    const TablaRetiro:Tabla[] = selectedRowsRetiro.map((obj) => {
        return {
            cod_asignatura:obj.cod_asignatura,
            nombre: obj.nombre,
            ciclo_asignatura: obj.ciclo_asignatura,
            id_seccion: obj.id_seccion
        };
    });
    const TablaCambio:Tabla[] = selectedRowsCambio.map((obj) => {
        return {
            cod_asignatura:obj.cod_asignatura,
            nombre: obj.nombre,
            ciclo_asignatura: obj.ciclo_asignatura,
            id_seccion: obj.id_seccion
        };
    });


    // Función para manejar cambios en el estado del checkbox
    const handleCheckboxChange = (rowIndex: number, checkboxType: string
                                  ) => {
        // Utiliza la función de retorno de llamada de setCheckedRows para garantizar la actualización
        setCheckedRows((prevCheckedRows) => {
            // Copiar el estado actual de las filas marcadas
            const newCheckedRows = [...prevCheckedRows];

            // Crear una clave única para identificar el checkbox en la fila actual
            const key = `${rowIndex}_${checkboxType}`;

            // Obtener el tipo opuesto del checkbox actual
            const oppositeType = checkboxType === 'Cambio' ? 'Retiro' : 'Cambio';
            const oppositeKey = `${rowIndex}_${oppositeType}`;

            // Desmarcar el checkbox opuesto si el checkbox actual está marcado
            const oppositeIndex = newCheckedRows.indexOf(oppositeKey);
            if (oppositeIndex !== -1) {
                newCheckedRows.splice(oppositeIndex, 1);
            }

            // Si está marcado, desmarcarlo; de lo contrario, marcarlo
            const index = newCheckedRows.indexOf(key);
            if (index !== -1) {
                newCheckedRows.splice(index, 1);
            } else {
                newCheckedRows.push(key);
            }
            // Filtrar las filas seleccionadas basadas en cambios
            const newSelectedRows = TableData.filter((_, index) =>
                newCheckedRows.includes(`${index}_Cambio`) || newCheckedRows.includes(`${index}_Retiro`)
            );
            //////////////////////////////////////////////////////////////////////
            // Filtrar las filas seleccionadas basadas en cambios
            const newSelectedRowsCambio = TableData.filter((_, index) =>
                newCheckedRows.includes(`${index}_Cambio`)
            );
            // Filtrar las filas seleccionadas basadas en Retiros
            const newSelectedRowsRetiro = TableData.filter((_, index) =>
                newCheckedRows.includes(`${index}_Retiro`)
            );
            setSelectedRowsRetiro(newSelectedRowsRetiro);
            setSelectedRowsCambio(newSelectedRowsCambio);
            //////////////////////////////////////////////////////////////////////

            setSelectedRows(newSelectedRows);

            // Implementar lógica adicional si es necesario
            console.log(`Checkbox clickeado en la fila ${rowIndex} de tipo ${checkboxType}`);
            console.log(`Lista de seleccionadas: ${JSON.stringify(newSelectedRows)}`);

            // Devolver el nuevo array de filas marcadas
            return newCheckedRows;
        });


    };
    // get table row data
    const tdData = () => {
        let x = 0;

        // Verificar si TableData es un array antes de usar map
        if (!Array.isArray(TableData)) {
            // Puedes manejar este caso según tus requisitos
            console.error("TableData is not an array");
            return null;
        }

        return TableData.map((data, index) => (
            <tr key={x++} className="shared-tr">
                <td key={x++} className="shared-td">
                    {index + 1}
                </td>
                {column.map((v) => (
                    <td key={x++} className="shared-td">
                        {data[v]}
                    </td>
                ))}
                <td key={x++} className="shared-td">
                    <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(index,'Cambio')}
                        checked={checkedRows.includes(`${index}_Cambio`)}
                    />
                </td>
                <td key={x++} className="shared-td">
                    <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(index,'Retiro')}
                        checked={checkedRows.includes(`${index}_Retiro`)}
                    />
                </td>
            </tr>
        ));
    };

    return (
        <>
            <section className="sec">
                <div id="shared-table-p">
                    {typeof type === "string" ? type.charAt(0).toUpperCase() + type.slice(1) : ""}

                    {/*
                {type.charAt(0).toUpperCase() + type.slice(1)}
                */}
                </div>
                <table className="shared-table" id="myTable">
                    <thead>
                    <tr className="shared-tr">{ThData()}</tr>
                    </thead>
                    <tbody>{tdData()}</tbody>
                </table>
            </section>
            <DetalleCursoTable rowData={TablaCambio} type={"Cursos a Cambiar"}
                />
            <TablaAsignaturasRetiro rowData={TablaRetiro} type={"Cursos a Retirar"}
                />

        </>




    );
}

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
/*

    // get table row data
    const tdData = () => {
        let x = 0;
        return TableData.map((data, index) => (
            <tr key={x++} className="shared-tr">
                <td key={x++} className="shared-td">
                    {index + 1}
                </td>
                {column.map((v) => (
                    <td key={x++} className="shared-td">
                        {data[v]}
                    </td>
                ))}
                <td key={x++} className="shared-td">
                    <input type="checkbox" onChange={() => handleCheckboxChange(index)} />
                </td>
                <td key={x++} className="shared-td">
                    <input type="checkbox" onChange={() => handleCheckboxChange(index)} />
                </td>
            </tr>
        ));
    };

    // Función para manejar cambios en el estado del checkbox
    const handleCheckboxChange = (rowIndex) => {
        // Implementa lógica según tus necesidades al manejar cambios en el estado del checkbox
        console.log(`Checkbox clicked in row ${rowIndex}`);
    };

    return (
        <section className="sec">
            <div id="shared-table-p">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <table className="shared-table" id="myTable">
                <thead>
                <tr className="shared-tr">{ThData()}</tr>
                </thead>
                <tbody>{tdData()}</tbody>
            </table>
        </section>
    );
};
*/

