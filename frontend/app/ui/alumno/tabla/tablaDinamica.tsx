import "@/app/ui/alumno/tabla/Tabla.css";
import {TableDataItem} from "@/app/lib/fomat-table";

export default function DynamicTable (TableData: TableDataItem[], type: string,checkedRows,setCheckedRows){

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

    // Función para manejar cambios en el estado del checkbox
    const handleCheckboxChange = (rowIndex: number, checkboxType: string) => {
        // Copiar el estado actual de las filas marcadas
        const newCheckedRows = [...checkedRows];

        // Crear una clave única para identificar el checkbox en la fila actual
        const key = `${rowIndex}_${checkboxType}`;

        // Obtener el tipo opuesto del checkbox actual
        const oppositeType = checkboxType === 'Cambio' ? 'Retiro' : 'Cambio';
        const oppositeKey = `${rowIndex}_${oppositeType}`;

        // Verificar si el checkbox actual está marcado
        const isChecked = newCheckedRows.includes(key);

        // Desmarcar el checkbox opuesto si el checkbox actual está marcado
        if (isChecked) {
            const oppositeIndex = newCheckedRows.indexOf(oppositeKey);
            if (oppositeIndex !== -1) {
                newCheckedRows.splice(oppositeIndex, 1);
            }
        }

        // Si está marcado, desmarcarlo; de lo contrario, marcarlo
        if (isChecked) {
            const index = newCheckedRows.indexOf(key);
            newCheckedRows.splice(index, 1);
        } else {
            newCheckedRows.push(key);
            const oppositeIndex = newCheckedRows.indexOf(oppositeKey);
            if (oppositeIndex !== -1) {
                newCheckedRows.splice(oppositeIndex, 1);
            }
        }

        // Actualizar el estado con el nuevo array de filas marcadas
        setCheckedRows(newCheckedRows);

        // Implementar lógica adicional si es necesario
        console.log(`Checkbox clickeado en la fila ${rowIndex} de tipo ${checkboxType}`);
        console.log(`Lista de filas_tipo elegidas: ${newCheckedRows}`);
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

