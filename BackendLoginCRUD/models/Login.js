/*const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Login = sequelize.define("login", {
  USERNAME: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PASSWORD: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  TIPOUSUARIO: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "login",
  timestamps: false,
});

module.exports = { Login };

*/




const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Login = sequelize.define(
  "Login",
  {
    USERNAME: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TIPOUSUARIO: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "login",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Login;



