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

// CRIAR RESERVA (CORRIGIDO COM TO_DATE)
async function criarReserva(req, res) {
  const { id_marinheiro, id_barco, data } = req.body;

  try {
    const conn = await oracledb.getConnection(dbConfig);

    await conn.execute(
      `INSERT INTO Reservas (id_marinheiro, id_barco, data)
       VALUES (:id_marinheiro, :id_barco, TO_DATE(:data, 'YYYY-MM-DD'))`,
      { id_marinheiro, id_barco, data },
      { autoCommit: true }
    );

    await conn.close();
    res.json({ message: "Reserva criada com sucesso!" });

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
      `SELECT * FROM Reservas WHERE id_marinheiro = :id ORDER BY data`,
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
      `SELECT * FROM Reservas WHERE id_barco = :id ORDER BY data`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
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
      { id },
      { autoCommit: true }
    );
    await conn.close();
    res.json({ message: "Reserva eliminada com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// ATUALIZAR RESERVA
async function atualizarReserva(req, res) {
  const { id } = req.params;
  const { id_marinheiro, id_barco, data } = req.body;

  try {
    const conn = await oracledb.getConnection(dbConfig);

    // 1) Verificar se a reserva existe
    const checkReserva = await conn.execute(
      `SELECT COUNT(*) AS total FROM Reservas WHERE id_reserva = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (checkReserva.rows[0].TOTAL === 0) {
      await conn.close();
      return res.status(404).json({ error: "Reserva não encontrada." });
    }

    // 2) Verificar se o marinheiro existe
    const checkMarinheiro = await conn.execute(
      `SELECT COUNT(*) AS total FROM Marinheiros WHERE id_marinheiro = :id_marinheiro`,
      { id_marinheiro },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (checkMarinheiro.rows[0].TOTAL === 0) {
      await conn.close();
      return res.status(400).json({ error: "Marinheiro não existe." });
    }

    // 3) Verificar se o barco existe
    const checkBarco = await conn.execute(
      `SELECT COUNT(*) AS total FROM Barcos WHERE id_barco = :id_barco`,
      { id_barco },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (checkBarco.rows[0].TOTAL === 0) {
      await conn.close();
      return res.status(400).json({ error: "Barco não existe." });
    }

    // 4) Verificar se o barco está livre na nova data (exceto esta reserva)
    const checkDisponivel = await conn.execute(
      `SELECT COUNT(*) AS total
       FROM Reservas
       WHERE id_barco = :id_barco
       AND data = TO_DATE(:data, 'YYYY-MM-DD')
       AND id_reserva != :id`,
      { id_barco, data, id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (checkDisponivel.rows[0].TOTAL > 0) {
      await conn.close();
      return res.status(400).json({ error: "O barco já está reservado nessa data." });
    }

    // 5) Atualizar a reserva
    await conn.execute(
      `UPDATE Reservas
       SET id_marinheiro = :id_marinheiro,
           id_barco = :id_barco,
           data = TO_DATE(:data, 'YYYY-MM-DD')
       WHERE id_reserva = :id`,
      { id_marinheiro, id_barco, data, id },
      { autoCommit: true }
    );

    await conn.close();
    res.json({ message: "Reserva atualizada com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listarReservas,
  obterReserva,
  criarReserva,
  eliminarReserva,
  listarReservasPorMarinheiro,
  listarReservasPorBarco,
  atualizarReserva
};

