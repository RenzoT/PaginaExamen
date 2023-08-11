import express from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import { fileURLToPath } from "url"; // Node.js built-in module
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5500;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const db = new sqlite3.Database(
  path.join(__dirname, "examenes.db"),
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Error al conectarse a la base de datos:", err.message);
      process.exit(1);
    }
    console.log("Conexión exitosa con la base de datos SQLite.");
  }
);

app.get("/buscar", (req, res) => {
  const { examen, ano, id } = req.query;
  console.log(
    `Buscando resultados para el examen ${examen} del año ${ano} con ID ${id}.`
  );
  const sql = `SELECT * FROM resultados WHERE examen = ? AND ano = ? AND id = ?`;

  db.get(sql, [examen, ano, id], (err, row) => {
    if (err) {
      console.error("Error al realizar la consulta:", err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: "No se encontraron resultados." });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

process.on("exit", () => {
  db.close();
});

process.on("SIGINT", () => {
  console.log("\nCerrando servidor y base de datos...");
  db.close();
  process.exit(0);
});
