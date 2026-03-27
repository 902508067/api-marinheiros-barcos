const express = require('express');
require('dotenv').config();

const initDb = require('./src/db/connection');
initDb();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Marinheiros e Barcos - Online');
});

const PORT = process.env.PORT || 3000;
const marinheirosRoutes = require('./src/routes/marinheiros');
app.use(marinheirosRoutes);
app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));



