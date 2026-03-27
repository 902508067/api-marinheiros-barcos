const express = require('express');
const router = express.Router();
const { criarMarinheiro, listarMarinheiros, atualizarMarinheiro, apagarMarinheiro } = require('../controllers/marinheirosController');

router.post('/marinheiros', criarMarinheiro);
router.get('/marinheiros', listarMarinheiros);
router.put('/marinheiros/:id', atualizarMarinheiro);
router.delete('/marinheiros/:id', apagarMarinheiro);

module.exports = router;
