/*const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("crudjson", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = { sequelize };
*/





const { Sequelize } = require("sequelize");

// Conexión a MySQL
const sequelize = new Sequelize("crudjson", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // quita logs de SQL si quieres
});

// Opcional: probar conexión al importar
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a MySQL exitosa.");
  } catch (err) {
    console.error("Error al conectar a MySQL:", err);
  }
})();

module.exports = sequelize;


