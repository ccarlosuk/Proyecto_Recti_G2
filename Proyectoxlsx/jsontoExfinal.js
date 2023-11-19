const express = require('express');
const XLSX = require('xlsx');
const fs = require('fs');

const app = express();

const filePath = './excel/datos.xlsx'; // Ruta al archivo Excel
const sheetName = 'Datos'; // Nombre de la hoja en el archivo Excel

app.get('/add-data-to-excel', (req, res) => {
  let workbook;

  if (fs.existsSync(filePath)) {
    // Si el archivo existe, lo lee
    workbook = XLSX.readFile(filePath);
  } else {
    // Si el archivo no existe, crea un nuevo libro de trabajo y una hoja
    workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([[]]), sheetName);
  }

  const worksheet = workbook.Sheets[sheetName];

  const jsonData = [
    // Datos del archivo JSON que deseas agregar
    { "nombre": 'Nuevo Ejemplo 11', "edad": 28, "ciudad": 'Ciudad 3' },
    { "nombre": 'Nuevo Ejemplo 12', "edad": 35, "ciudad": 'Ciudad 4' },
    // ... más datos JSON
  ];

  // Limpiar filas vacías existentes
  if (worksheet && worksheet['!ref']) {
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let i = range.s.r; i <= range.e.r; ++i) {
      const row = XLSX.utils.encode_row(i);
      if (worksheet[row] && worksheet[row].t === undefined) {
        XLSX.utils.sheet_delete_rows(worksheet, i, 1);
        --i; // Ajustar el índice después de la eliminación de la fila
      }
    }
  }

  // Obtener la fila en la que se insertarán los nuevos datos
  let startingRow = XLSX.utils.decode_range(worksheet['!ref'] || 'A1').e.r + 1;

  // Agregar los datos del JSON a la hoja de cálculo a partir de la siguiente fila disponible
  XLSX.utils.sheet_add_json(worksheet, jsonData, { skipHeader: true, origin: startingRow });

  // Escribir el libro de trabajo con los cambios en el archivo
  XLSX.writeFile(workbook, filePath);

  res.send('Datos agregados correctamente al archivo Excel');
});

app.listen(3001, () => {
  console.log('Servidor escuchando en el puerto http://localhost:3001/add-data-to-excel');
});