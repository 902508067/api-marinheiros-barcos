const express = require('express');
const router = express.Router();
const { criarBarco, listarBarcos, atualizarBarco } = require('../controllers/barcosController');

router.post('/barcos', criarBarco);
router.get('/barcos', listarBarcos);
router.put('/barcos/:id', atualizarBarco);

module.exports = router;

