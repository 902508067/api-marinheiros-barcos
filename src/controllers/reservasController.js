const oracledb = require("oracledb");
const dbConfig = require("../config/dbConfig");

// LISTAR TODAS AS RESERVAS
exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT id_reserva, id_barco, id_marinheiro, data 
       FROM reservas 
       ORDER BY id_reserva`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao obter reservas:", err);
    res.status(500).json({ error: "Erro ao obter reservas" });
  } finally {
    if (conn) await conn.close();
  }
};

// OBTER UMA RESERVA
exports.getById = async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT id_reserva, id_barco, id_marinheiro, data 
       FROM reservas 
       WHERE id_reserva = :id`,
      [req.params.id],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Reserva não encontrada" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao obter reserva:", err);
    res.status(500).json({ error: "Erro ao obter reserva" });
  } finally {
    if (conn) await conn.close();
  }
};

// CRIAR RESERVA
exports.create = async (req, res) => {
  let conn;
  try {
    const { id_barco, id_marinheiro, data } = req.body;

    conn = await oracledb.getConnection(dbConfig);

    await conn.execute(
      `INSERT INTO reservas (id_reserva, id_barco, id_marinheiro, data)
       VALUES (seq_reservas.NEXTVAL, :id_barco, :id_marinheiro, TO_DATE(:data, 'YYYY-MM-DD'))`,
      { id_barco, id_marinheiro, data },
      { autoCommit: true }
    );

    res.json({ message: "Reserva criada com sucesso!" });
  } catch (err) {
    console.error("Erro ao criar reserva:", err);
    res.status(500).json({ error: "Erro ao criar reserva" });
  } finally {
    if (conn) await conn.close();
  }
};

// ATUALIZAR RESERVA
exports.update = async (req, res) => {
  let conn;
  try {
    const { id_barco, id_marinheiro, data } = req.body;

    conn = await oracledb.getConnection(dbConfig);

    await conn.execute(
      `UPDATE reservas
       SET id_barco = :id_barco,
           id_marinheiro = :id_marinheiro,
           data = TO_DATE(:data, 'YYYY-MM-DD')
       WHERE id_reserva = :id`,
      { id_barco, id_marinheiro, data, id: req.params.id },
      { autoCommit: true }
    );

    res.json({ message: "Reserva atualizada com sucesso!" });
  } catch (err) {
    console.error("Erro ao atualizar reserva:", err);
    res.status(500).json({ error: "Erro ao atualizar reserva" });
  } finally {
    if (conn) await conn.close();
  }
};

// ELIMINAR RESERVA
exports.delete = async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection(dbConfig);

    await conn.execute(
      `DELETE FROM reservas WHERE id_reserva = :id`,
      [req.params.id],
      { autoCommit: true }
    );

    res.json({ message: "Reserva eliminada com sucesso!" });
  } catch (err) {
    console.error("Erro ao eliminar reserva:", err);
    res.status(500).json({ error: "Erro ao eliminar reserva" });
  } finally {
    if (conn) await conn.close();
  }
};
