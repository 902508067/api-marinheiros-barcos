const oracledb = require('oracledb');

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

module.exports = { criarMarinheiro };
