// app.js
const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");
require("dotenv").config();

const barcosRoutes = require("./src/routes/barcos");
const marinheirosRoutes = require("./src/routes/marinheiros");
const reservasRoutes = require("./src/routes/reservas");

const app = express();
app.use(cors());
app.use(express.json());

async function initOracle() {
  try {
    await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT
    });
    console.log("Ligação à base de dados bem-sucedida!");
  } catch (err) {
    console.error("Erro ao ligar à Oracle:", err);
  }
}

initOracle();

app.use("/api", barcosRoutes);
app.use("/api", marinheirosRoutes);
app.use("/api", reservasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
