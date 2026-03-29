const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
oracledb.thin = true;   // <--- ESTA LINHA É A CHAVE
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

const marinheirosRoutes = require('./src/routes/marinheiros');
const barcosRoutes = require('./src/routes/barcos');
const reservasRoutes = require('./src/routes/reservas');

app.use(marinheirosRoutes);
app.use(barcosRoutes);
app.use(reservasRoutes);

async function testarConexao() {
  try {
    const conn = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECTION
    });

    console.log("Ligação à base de dados bem-sucedida!");
    await conn.close();
  } catch (err) {
    console.error("Erro ao ligar à base de dados:", err);
  }
}

testarConexao();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
