const express = require('express');
const router = express.Router();

const {
  listarBarcos,
  criarBarco,
  atualizarBarco,
  eliminarBarco,
  listarBarcosDisponiveis
} = require('../controllers/barcosController');

router.get('/barcos', listarBarcos);
router.post('/barcos', criarBarco);
router.put('/barcos/:id', atualizarBarco);
router.delete('/barcos/:id', eliminarBarco);
router.get('/barcos/disponiveis/:data', listarBarcosDisponiveis);

module.exports = router;
