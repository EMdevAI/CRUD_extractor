const express = require("express");
const app = express();
const puerto = 8080;

const sequelize = require("./config/database"); // Conexión a MySQL
const Login = require("./models/Login");
const TablaJson = require("./models/TablaJson");

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ------------------- ENDPOINTS -------------------

// Obtener una pregunta por id
app.get("/pregunta", async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: "Falta idEjercicio" });

    const resultado = await TablaJson.findOne({ where: { idEjercicio: id } });
    if (!resultado)
      return res.status(404).json({ mensaje: "No hay datos para ese id" });

    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las preguntas
app.get("/preguntas", async (req, res) => {
  try {
    const resultados = await TablaJson.findAll();
    res.json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login
app.get("/login", async (req, res) => {
  try {
    const user = req.query.User;
    const password = req.query.password;

    if (!user || !password)
      return res.status(400).json({ status: "no", tipo: "nodefinido" });

    const resultado = await Login.findOne({
      where: { USERNAME: user, PASSWORD: password },
    });

    if (!resultado)
      return res.status(401).json({ status: "no", tipo: "nodefinido" });

    res.json({ status: "yes", tipo: resultado.TIPOUSUARIO });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------- INICIALIZACIÓN BASE DE DATOS -------------------
const iniciarServidor = async () => {
  try {
    // Probar conexión
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa.");

    // Crear tablas según modelos (force:true borra y crea de nuevo)
    await sequelize.sync({});
    console.log("Tablas creadas correctamente.");

    // Crear usuario admin
    await Login.create({
      USERNAME: "admin",
      PASSWORD: "1234",
      TIPOUSUARIO: "administrador",
    });
    console.log("Usuario admin creado.");

    // Iniciar servidor
    app.listen(puerto, () => {
      console.log(`Servidor corriendo en http://localhost:${puerto}`);
    });
  } catch (err) {
    console.error("Error al inicializar la base de datos:", err);
  }
};

// Llamar a la función
iniciarServidor();
