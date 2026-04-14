const oracledb = require("oracledb");
const dbConfig = require("../config/dbConfig");

exports.getAll = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT id_marinheiro, nome, classificacao, idade FROM marinheiros ORDER BY id_marinheiro`,
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
      `SELECT id_marinheiro, nome, classificacao, idade 
       FROM marinheiros 
       WHERE id_marinheiro = :id`,
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
    const { nome, idade, classificacao } = req.body;

    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `INSERT INTO marinheiros (id_marinheiro, nome, classificacao, idade)
       VALUES (seq_marinheiros.NEXTVAL, :nome, :classificacao, :idade)`,
      { nome, classificacao, idade },
      { autoCommit: true }
    );

    res.json({ message: "Marinheiro criado com sucesso!" });
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
    const { nome, idade, classificacao } = req.body;

    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `UPDATE marinheiros
       SET nome = :nome,
           classificacao = :classificacao,
           idade = :idade
       WHERE id_marinheiro = :id`,
      { nome, classificacao, idade, id: req.params.id },
      { autoCommit: true }
    );

    res.json({ message: "Marinheiro atualizado com sucesso!" });
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

    res.json({ message: "Marinheiro eliminado com sucesso!" });
  } catch (err) {
    console.error("Erro ao eliminar marinheiro:", err);
    res.status(500).json({ error: "Erro ao eliminar marinheiro" });
  } finally {
    if (connection) await connection.close();
  }
};
