const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: "tu_host_de_mysql",   //Aquí colocas el nombre de tu host. Ej: localhost
  user: "tu_usuario_de_mysql",    //Aquí colocas tu usuario. Ej: root
  password: "tu_contraseña_de_mysql",
  database: "tu_base_de_datos"
});

connection.connect(err => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos establecida");

// Consulta SQL para crear la tabla formulario si no existe
  const createTable = `
    CREATE TABLE IF NOT EXISTS formulario (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      telefono VARCHAR(15) NOT NULL,
      mensaje TEXT NOT NULL
    )`;

  connection.query(createTable, (err, result) => {
    if (err) {
      console.error('Error al crear la tabla formulario:', err);
    } else {
      console.log('Tabla formulario creada o ya existente');
    }
  });
});

app.use(express.json());

// Ruta para procesar el formulario
app.post("/procesar-formulario", (request, response) => {
  const { nombre, email, telefono, mensaje } = request.body;

  // Consulta MySQL para insertar los datos en la tabla formulario
  const sql = "INSERT INTO formulario (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)";
  const values = [nombre, email, telefono, mensaje];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al guardar en la base de datos:", err);
      return response.status(500).send("Error al procesar el formulario");
    }
    console.log("Formulario guardado correctamente en la base de datos");
    response.send("¡Formulario procesado con éxito!");
  });
});

// Cierre de la conexión a la base de datos cuando la aplicación se cierra
process.on("exit", () => {
  connection.end();
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});