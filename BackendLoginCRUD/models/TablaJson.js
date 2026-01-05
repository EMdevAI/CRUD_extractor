/*const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const TablaJson = sequelize.define(
  "tablajson",
  {
    idEjercicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    columnajson: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "tablajson",
    timestamps: false,
  }
);

module.exports = { TablaJson };
*/



const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TablaJson = sequelize.define(
  "TablaJson",
  {
    idEjercicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    columnajson: {
      type: DataTypes.JSON, // puedes usar STRING si tu columna es texto
      allowNull: false,
    },
  },
  {
    tableName: "tablajson",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = TablaJson;

