const sqlite3 = require('sqlite3').verbose();

// Crear una nueva base de datos (o conectarse si ya existe)
let db = new sqlite3.Database('./examenes.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Conexión exitosa con la base de datos SQLite.');
});

// Crear la tabla "resultados"
const createTableQuery = `
CREATE TABLE IF NOT EXISTS resultados (
    id INTEGER PRIMARY KEY,
    examen TEXT NOT NULL,
    ano TEXT NOT NULL,
    nombre TEXT NOT NULL,
    puntaje INTEGER NOT NULL,
    seccion TEXT NOT NULL
);`;

db.run(createTableQuery, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Tabla 'resultados' creada con éxito.");
});

// Cerrar la conexión a la base de datos
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Cierre exitoso de la conexión a la base de datos SQLite.');
});
