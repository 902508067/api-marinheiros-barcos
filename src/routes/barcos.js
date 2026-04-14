const express = require('express');
const router = express.Router();
const barcosController = require('../controllers/barcosController');

router.get('/barcos', barcosController.getAll);
router.get('/barcos/:id', barcosController.getById);
router.post('/barcos', barcosController.create);
router.put('/barcos/:id', barcosController.update);
router.delete('/barcos/:id', barcosController.delete);

module.exports = router;
