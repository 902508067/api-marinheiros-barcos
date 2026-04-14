const oracledb = require("oracledb");
const dbConfig = require("../config/dbConfig");

// LISTAR TODOS
exports.getAll = async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT 
          id_barco AS id_barco,
          nome AS nome,
          cor AS cor
       FROM barcos`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao obter barcos:", err);
    res.status(500).json({ error: "Erro ao obter barcos" });
  } finally {
    if (connection) await connection.close();
  }
};

// OBTER UM
exports.getById = async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT 
          id_barco AS id_barco,
          nome AS nome,
          cor AS cor
       FROM barcos
       WHERE id_barco = :id`,
      [req.params.id],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Barco não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao obter barco:", err);
    res.status(500).json({ error: "Erro ao obter barco" });
  } finally {
    if (connection) await connection.close();
  }
};

// CRIAR
exports.create = async (req, res) => {
  let connection;

  try {
    const { nome, cor } = req.body;

    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `INSERT INTO barcos (nome, cor)
       VALUES (:nome, :cor)
       RETURNING id_barco INTO :id`,
      {
        nome,
        cor,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );

    res.json({
      id_barco: result.outBinds.id[0],
      nome,
      cor
    });
  } catch (err) {
    console.error("Erro ao criar barco:", err);
    res.status(500).json({ error: "Erro ao criar barco" });
  } finally {
    if (connection) await connection.close();
  }
};

// ATUALIZAR
exports.update = async (req, res) => {
  let connection;

  try {
    const { nome, cor } = req.body;

    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `UPDATE barcos
       SET nome = :nome,
           cor = :cor
       WHERE id_barco = :id`,
      {
        nome,
        cor,
        id: req.params.id
      },
      { autoCommit: true }
    );

    res.json({ message: "Barco atualizado com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar barco:", err);
    res.status(500).json({ error: "Erro ao atualizar barco" });
  } finally {
    if (connection) await connection.close();
  }
};

// ELIMINAR
exports.delete = async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `DELETE FROM barcos WHERE id_barco = :id`,
      [req.params.id],
      { autoCommit: true }
    );

    res.json({ message: "Barco eliminado com sucesso" });
  } catch (err) {
    console.error("Erro ao eliminar barco:", err);
    res.status(500).json({ error: "Erro ao eliminar barco" });
  } finally {
    if (connection) await connection.close();
  }
};
