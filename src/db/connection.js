const oracledb = require('oracledb');
require('dotenv').config();

async function init() {
  try {
    await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION
    });

    console.log("Ligado à base de dados Oracle!");
  } catch (err) {
    console.error("Erro ao ligar à Oracle:", err);
  }
}

module.exports = init;
