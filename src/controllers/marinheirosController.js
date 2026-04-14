const oracledb = require('oracledb');
oracledb.thin = true;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DB_CONNECTION
};

// -----------------------------
// LISTAR MARINHEIROS
// -----------------------------
async function listarMarinheiros(req, res) {
  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT * FROM Marinheiros ORDER BY id_marinheiro`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// -----------------------------
// OBTER MARINHEIRO
// -----------------------------
async function obterMarinheiro(req, res) {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT * FROM Marinheiros WHERE id_marinheiro = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Marinheiro não encontrado." });
    }

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// -----------------------------
// CRIAR MARINHEIRO
// -----------------------------
async function criarMarinheiro(req, res) {
  const { nome, classificacao, idade } = req.body;

  if (!nome || !classificacao || !idade) {
    return res.status(400).json({ error: "Nome, classificação e idade são obrigatórios." });
  }

  try {
    const conn = await oracledb.getConnection(dbConfig);

    await conn.execute(
      `INSERT INTO Marinheiros (id_marinheiro, nome, classificacao, idade)
       VALUES (seq_marinheiros.NEXTVAL, :nome, :classificacao, :idade)`,
      { nome, classificacao, idade },
      { autoCommit: true }
    );

    await conn.close();
    res.json({ message: "Marinheiro criado com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// -----------------------------
// ATUALIZAR MARINHEIRO
// -----------------------------
async function atualizarMarinheiro(req, res) {
  const { id } = req.params;
  const { nome, classificacao, idade } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  if (!nome || !classificacao || !idade) {
    return res.status(400).json({ error: "Nome, classificação e idade são obrigatórios." });
  }

  if (isNaN(idade)) {
    return res.status(400).json({ error: "Idade deve ser numérica." });
  }

  if (isNaN(classificacao) || classificacao < 1 || classificacao > 5) {
    return res.status(400).json({ error: "Classificação deve ser um número entre 1 e 5." });
  }

  try {
    const conn = await oracledb.getConnection(dbConfig);

    const check = await conn.execute(
      `SELECT COUNT(*) AS total FROM Marinheiros WHERE id_marinheiro = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (check.rows[0].TOTAL === 0) {
      await conn.close();
      return res.status(404).json({ error: "Marinheiro não encontrado." });
    }

    await conn.execute(
      `UPDATE Marinheiros
       SET nome = :nome, classificacao = :classificacao, idade = :idade
       WHERE id_marinheiro = :id`,
      { nome, classificacao, idade, id },
      { autoCommit: true }
    );

    await conn.close();
    res.json({ message: "Marinheiro atualizado com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// -----------------------------
// ATUALIZAR CLASSIFICAÇÃO
// -----------------------------
async function atualizarClassificacao(req, res) {
  const { id } = req.params;
  const { classificacao } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  if (isNaN(classificacao) || classificacao < 1 || classificacao > 5) {
    return res.status(400).json({ error: "Classificação deve ser um número entre 1 e 5." });
  }

  try {
    const conn = await oracledb.getConnection(dbConfig);

    const check = await conn.execute(
      `SELECT COUNT(*) AS total FROM Marinheiros WHERE id_marinheiro = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (check.rows[0].TOTAL === 0) {
      await conn.close();
      return res.status(404).json({ error: "Marinheiro não encontrado." });
    }

    await conn.execute(
      `UPDATE Marinheiros
       SET classificacao = :classificacao
       WHERE id_marinheiro = :id`,
      { classificacao, id },
      { autoCommit: true }
    );

    await conn.close();
    res.json({ message: "Classificação atualizada com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// -----------------------------
// ELIMINAR MARINHEIRO
// -----------------------------
async function eliminarMarinheiro(req, res) {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const conn = await oracledb.getConnection(dbConfig);

    const check = await conn.execute(
      `SELECT COUNT(*) AS total
       FROM Reservas
       WHERE id_marinheiro = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (check.rows[0].TOTAL > 0) {
      await conn.close();
      return res.status(400).json({
        error: "Não é possível eliminar o marinheiro porque tem reservas associadas."
      });
    }

    const result = await conn.execute(
      `DELETE FROM Marinheiros WHERE id_marinheiro = :id`,
      { id },
      { autoCommit: true }
    );

    await conn.close();

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: "Marinheiro não encontrado." });
    }

    res.json({ message: "Marinheiro eliminado com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// -----------------------------
// LISTAR POR CLASSIFICAÇÃO
// -----------------------------
async function listarPorClassificacao(req, res) {
  const { classificacao } = req.params;

  if (isNaN(classificacao) || classificacao < 1 || classificacao > 5) {
    return res.status(400).json({ error: "Classificação deve ser um número entre 1 e 5." });
  }

  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT * FROM Marinheiros WHERE classificacao = :classificacao`,
      { classificacao },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listarMarinheiros,
  obterMarinheiro,
  criarMarinheiro,
  atualizarMarinheiro,
  atualizarClassificacao,
  eliminarMarinheiro,
  listarPorClassificacao
};
