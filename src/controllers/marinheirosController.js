const oracledb = require("oracledb");
const dbConfig = require("../config/dbConfig");

exports.getAll = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT id_marinheiro, nome, idade FROM marinheiros`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao obter marinheiros:", err);
    res.status(500).json({ error: "Erro ao obter marinheiros" });
  } finally {
    if (connection) await connection.close();
  }
};

exports.getById = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT id_marinheiro, nome, idade FROM marinheiros WHERE id_marinheiro = :id`,
      [req.params.id],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Marinheiro não encontrado" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao obter marinheiro:", err);
    res.status(500).json({ error: "Erro ao obter marinheiro" });
  } finally {
    if (connection) await connection.close();
  }
};

exports.create = async (req, res) => {
  let connection;
  try {
    const { nome, idade } = req.body;
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `INSERT INTO marinheiros (nome, idade)
       VALUES (:nome, :idade)
       RETURNING id_marinheiro INTO :id`,
      {
        nome,
        idade,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );

    res.json({
      id_marinheiro: result.outBinds.id[0],
      nome,
      idade
    });
  } catch (err) {
    console.error("Erro ao criar marinheiro:", err);
    res.status(500).json({ error: "Erro ao criar marinheiro" });
  } finally {
    if (connection) await connection.close();
  }
};

exports.update = async (req, res) => {
  let connection;
  try {
    const { nome, idade } = req.body;
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `UPDATE marinheiros SET nome = :nome, idade = :idade WHERE id_marinheiro = :id`,
      { nome, idade, id: req.params.id },
      { autoCommit: true }
    );

    res.json({ message: "Marinheiro atualizado com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar marinheiro:", err);
    res.status(500).json({ error: "Erro ao atualizar marinheiro" });
  } finally {
    if (connection) await connection.close();
  }
};

exports.delete = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `DELETE FROM marinheiros WHERE id_marinheiro = :id`,
      [req.params.id],
      { autoCommit: true }
    );
    res.json({ message: "Marinheiro eliminado com sucesso" });
  } catch (err) {
    console.error("Erro ao eliminar marinheiro:", err);
    res.status(500).json({ error: "Erro ao eliminar marinheiro" });
  } finally {
    if (connection) await connection.close();
  }
};
