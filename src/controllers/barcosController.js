const oracledb = require('oracledb');

// Criar barco
async function criarBarco(req, res) {
  const { nome, cor } = req.body;

  try {
    const conn = await oracledb.getConnection();

    const result = await conn.execute(
      `INSERT INTO Barcos (nome, cor)
       VALUES (:nome, :cor)
       RETURNING id_barco INTO :id`,
      {
        nome,
        cor,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );

    await conn.commit();

    res.json({
      message: "Barco criado com sucesso!",
      id: result.outBinds.id[0]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Listar barcos
async function listarBarcos(req, res) {
  try {
    const conn = await oracledb.getConnection();

    const result = await conn.execute(
      `SELECT id_barco, nome, cor FROM Barcos`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Atualizar barco
async function atualizarBarco(req, res) {
  const { id } = req.params;
  const { nome, cor } = req.body;

  try {
    const conn = await oracledb.getConnection();

    const result = await conn.execute(
      `UPDATE Barcos
       SET nome = :nome,
           cor = :cor
       WHERE id_barco = :id`,
      { nome, cor, id: Number(id) }
    );

    await conn.commit();

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Barco não encontrado." });
    }

    res.json({ message: "Barco atualizado com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { criarBarco, listarBarcos, atualizarBarco };
