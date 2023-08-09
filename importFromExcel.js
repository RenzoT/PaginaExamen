const sqlite3 = require('sqlite3').verbose();
const XLSX = require('xlsx');

const workbook = XLSX.readFile('notas.xlsx'); // Reemplaza 'ruta_del_archivo.xlsx' con la ruta correcta de tu archivo
const sheetName = workbook.SheetNames[0]; // Suponemos que quieres la primera hoja
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

let db = new sqlite3.Database('./examenes.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Conexión exitosa con la base de datos SQLite.');
});

data.forEach(row => {
    const { id, examen, ano, nombre, puntaje, seccion } = row; // Asegúrate de que estos nombres coincidan con los encabezados de tu archivo Excel

    const insertQuery = `INSERT INTO resultados (id, examen, ano, nombre, puntaje, seccion) VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(insertQuery, [id, examen, ano, nombre, puntaje, seccion], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Fila insertada con ID: ${this.lastID}`);
    });
});

// Cerrar la conexión a la base de datos
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Cierre exitoso de la conexión a la base de datos SQLite.');
});
