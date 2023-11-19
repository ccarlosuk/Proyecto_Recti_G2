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
    { "nombre": 'Nuevo Ejemplo 7', "edad": 28, "ciudad": 'Ciudad 3' },
    { "nombre": 'Nuevo Ejemplo 8', "edad": 35, "ciudad": 'Ciudad 4' },
    // ... más datos JSON
  ];

  // Encabezados únicos para las columnas
  const headers = Object.keys(jsonData[0]); // Obtiene los nombres de las propiedades del primer objeto JSON

  // Si no hay datos existentes, se agregan los encabezados
  if (!worksheet || !worksheet['!ref']) {
    const headerRow = headers.map((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 });
      return { [cellAddress]: { t: 's', v: header, w: header } };
    }).reduce((prev, curr) => Object.assign(prev, curr), {});

    // Agregar los encabezados a la hoja de cálculo
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
    Object.assign(worksheet, headerRow);
  }

  // Obtener la fila en la que se insertarán los nuevos datos
  let startingRow = XLSX.utils.decode_range(worksheet['!ref'] || 'A1').e.r + 1;

  // Agregar los datos del JSON a la hoja de cálculo a partir de la siguiente fila disponible
  XLSX.utils.sheet_add_json(worksheet, jsonData, { skipHeader: true, origin: startingRow });

  // Escribir el libro de trabajo con los cambios en el archivo
  XLSX.writeFile(workbook, filePath);

  res.send('Datos agregados correctamente al archivo Excel');
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});