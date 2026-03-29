const oracledb = require('oracledb');
oracledb.thin = true;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DB_CONNECTION
};

// LISTAR BARCOS
async function listarBarcos(req, res) {
  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT * FROM Barcos ORDER BY id_barco`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// OBTER BARCO
async function obterBarco(req, res) {
  const { id } = req.params;

  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT * FROM Barcos WHERE id_barco = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Barco não encontrado." });
    }

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// CRIAR BARCO
async function criarBarco(req, res) {
  const { nome, capacidade } = req.body;

  try {
    const conn = await oracledb.getConnection(dbConfig);
    await conn.execute(
      `INSERT INTO Barcos (nome, capacidade)
       VALUES (:nome, :capacidade)`,
      { nome, capacidade },
      { autoCommit: true }
    );
    await conn.close();
    res.json({ message: "Barco criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ATUALIZAR BARCO
async function atualizarBarco(req, res) {
  const { id } = req.params;
  const { nome, capacidade } = req.body;

  try {
    const conn = await oracledb.getConnection(dbConfig);
    await conn.execute(
      `UPDATE Barcos
       SET nome = :nome, capacidade = :capacidade
       WHERE id_barco = :id`,
      { nome, capacidade, id },
      { autoCommit: true }
    );
    await conn.close();
    res.json({ message: "Barco atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ELIMINAR BARCO
async function eliminarBarco(req, res) {
  const { id } = req.params;

  try {
    const conn = await oracledb.getConnection(dbConfig);

    const check = await conn.execute(
      `SELECT COUNT(*) AS total
       FROM Reservas
       WHERE id_barco = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (check.rows[0].TOTAL > 0) {
      await conn.close();
      return res.status(400).json({
        error: "Não é possível eliminar o barco porque tem reservas associadas."
      });
    }

    await conn.execute(
      `DELETE FROM Barcos WHERE id_barco = :id`,
      { id },
      { autoCommit: true }
    );

    await conn.close();
    res.json({ message: "Barco eliminado com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// LISTAR BARCOS DISPONÍVEIS POR DATA
async function listarBarcosDisponiveis(req, res) {
  const { data } = req.params;

  try {
    const conn = await oracledb.getConnection(dbConfig);

    const result = await conn.execute(
      `SELECT b.*
       FROM Barcos b
       WHERE b.id_barco NOT IN (
         SELECT id_barco
         FROM Reservas
         WHERE data = TO_DATE(:data, 'YYYY-MM-DD')
       )
       ORDER BY b.id_barco`,
      { data },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    await conn.close();
    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
  listarBarcos,
  obterBarco,
  criarBarco,
  atualizarBarco,
  eliminarBarco,
  listarBarcosDisponiveis
};
