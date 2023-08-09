const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5500;

// Configuración para recibir JSON a través de peticiones POST
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('examenes.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Error al conectarse a la base de datos:", err.message);
        process.exit(1); // Finaliza el proceso si no se puede conectar a la base de datos
    }
    console.log('Conexión exitosa con la base de datos SQLite.');
});

app.get('/buscar', (req, res) => {
    const { examen, ano, id } = req.query;
    console.log(`Buscando resultados para el examen ${examen} del año ${ano} con ID ${id}.`)
    const sql = `SELECT * FROM resultados WHERE examen = ? AND ano = ? AND id = ?`;

    db.get(sql, [examen, ano, id], (err, row) => {
        if (err) {
            console.error("Error al realizar la consulta:", err.message);
            res.status(400).json({ error: err.message });
            return;
        }
        if(row) {
            res.json(row);
        } else {
            res.status(404).json({ message: "No se encontraron resultados." });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Manejar cierre inesperado
process.on('exit', () => {
    db.close();
});
process.on('SIGINT', () => {
    console.log("\nCerrando servidor y base de datos...");
    db.close();
    process.exit(0);
});
