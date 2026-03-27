const oracledb = require('oracledb');

// ----------------------
// CRIAR MARINHEIRO (POST)
// ----------------------
async function criarMarinheiro(req, res) {
  const { nome, classificacao, idade } = req.body;

  try {
    const conn = await oracledb.getConnection();

    const result = await conn.execute(
      `INSERT INTO Marinheiros (nome, classificacao, idade)
       VALUES (:nome, :classificacao, :idade)
       RETURNING id_marinheiro INTO :id`,
      {
        nome,
        classificacao,
        idade,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );

    await conn.commit();

    res.json({
      message: "Marinheiro criado com sucesso!",
      id: result.outBinds.id[0]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ----------------------
// LISTAR MARINHEIROS (GET)
// ----------------------
async function listarMarinheiros(req, res) {
  try {
    const conn = await oracledb.getConnection();

    const result = await conn.execute(
      `SELECT id_marinheiro, nome, classificacao, idade FROM Marinheiros`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ----------------------
// ATUALIZAR MARINHEIRO (PUT)
// ----------------------
async function atualizarMarinheiro(req, res) {
  const { id } = req.params;
  const { nome, classificacao, idade } = req.body;

  try {
    const conn = await oracledb.getConnection();

    const result = await conn.execute(
      `UPDATE Marinheiros
       SET nome = :nome,
           classificacao = :classificacao,
           idade = :idade
       WHERE id_marinheiro = :id`,
      { nome, classificacao, idade, id }
    );

    await conn.commit();

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Marinheiro não encontrado." });
    }

    res.json({ message: "Marinheiro atualizado com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function apagarMarinheiro(req, res) {
  const { id } = req.params;

  try {
    const conn = await oracledb.getConnection();

    const result = await conn.execute(
      `DELETE FROM Marinheiros WHERE id_marinheiro = :id`,
      { id }
    );

    await conn.commit();

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Marinheiro não encontrado." });
    }

    res.json({ message: "Marinheiro apagado com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { criarMarinheiro, listarMarinheiros, atualizarMarinheiro, apagarMarinheiro };

