const oracledb = require('oracledb');
oracledb.thin = true;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DB_CONNECTION
};

// LISTAR RESERVAS
async function listarReservas(req, res) {
  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT * FROM Reservas ORDER BY id_reserva`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// LISTAR RESERVAS POR MARINHEIRO
async function listarReservasPorMarinheiro(req, res) {
  const { id } = req.params;

  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT * FROM Reservas WHERE id_marinheiro = :id ORDER BY id_reserva`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// LISTAR RESERVAS POR BARCO
async function listarReservasPorBarco(req, res) {
  const { id } = req.params;

  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT * FROM Reservas WHERE id_barco = :id ORDER BY id_reserva`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// OBTER RESERVA
async function obterReserva(req, res) {
  const { id } = req.params;

  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT * FROM Reservas WHERE id_reserva = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reserva não encontrada." });
    }

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// CRIAR RESERVA
async function criarReserva(req, res) {
  const id_barco = req.body.id_barco || req.body.ID_BARCO;
  const id_marinheiro = req.body.id_marinheiro || req.body.ID_MARINHEIRO;
  const data = req.body.data || req.body.DATA;

  try {
    const conn = await oracledb.getConnection(dbConfig);

    await conn.execute(
      `INSERT INTO Reservas (id_reserva, id_barco, id_marinheiro, data)
       VALUES (seq_reservas.NEXTVAL, :id_barco, :id_marinheiro, TO_DATE(:data, 'YYYY-MM-DD'))`,
      { id_barco, id_marinheiro, data }
    );

    await conn.commit();
    await conn.close();

    res.json({ message: "Reserva criada com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ATUALIZAR RESERVA
async function atualizarReserva(req, res) {
  const { id } = req.params;

  const id_barco = req.body.id_barco || req.body.ID_BARCO;
  const id_marinheiro = req.body.id_marinheiro || req.body.ID_MARINHEIRO;
  const data = req.body.data || req.body.DATA;

  try {
    const conn = await oracledb.getConnection(dbConfig);

    await conn.execute(
      `UPDATE Reservas
       SET id_barco = :id_barco,
           id_marinheiro = :id_marinheiro,
           data = TO_DATE(:data, 'YYYY-MM-DD')
       WHERE id_reserva = :id`,
      { id_barco, id_marinheiro, data, id }
    );

    await conn.commit();
    await conn.close();

    res.json({ message: "Reserva atualizada com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ELIMINAR RESERVA
async function eliminarReserva(req, res) {
  const { id } = req.params;

  try {
    const conn = await oracledb.getConnection(dbConfig);

    await conn.execute(
      `DELETE FROM Reservas WHERE id_reserva = :id`,
      { id }
    );

    await conn.commit();
    await conn.close();

    res.json({ message: "Reserva eliminada com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listarReservas,
  listarReservasPorMarinheiro,
  listarReservasPorBarco,
  obterReserva,
  criarReserva,
  atualizarReserva,
  eliminarReserva
};
