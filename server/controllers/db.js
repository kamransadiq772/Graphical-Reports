const Sequelize = require("sequelize");
require('dotenv').config();
const db = {};

const env = process.env.NODE_ENV || 'production';
console.log(env)
let sequelize;
if (env == 'development') {
  sequelize = new Sequelize("SooperWizerQA_AZGARD", "sa", "spts@3311", {
    host: "10.0.0.9",
	port:1435,
    dialect: "mssql",
    dialectOptions: {
      options: { requestTimeout: 600000 }
    },
    freezeTableName: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
} else {
  sequelize = new Sequelize("SooperwizerQA", "sa", "Qwer1234", {
    host: "SRVSQMSAPP",
    dialect: "mssql",
    logging: false,
    dialectOptions: {
      options: { requestTimeout: 600000 }
    },
    freezeTableName: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
