const express = require('express');
const router = express.Router();
const controller = require('../controllers/marinheirosController');

router.get('/marinheiros', controller.listarMarinheiros);
router.get('/marinheiros/classificacao/:classificacao', controller.listarPorClassificacao);
router.get('/marinheiros/:id', controller.obterMarinheiro);

router.post('/marinheiros', controller.criarMarinheiro);

router.patch('/marinheiros/:id/classificacao', controller.atualizarClassificacao);
router.put('/marinheiros/:id', controller.atualizarMarinheiro);

router.delete('/marinheiros/:id', controller.eliminarMarinheiro);

module.exports = router;
