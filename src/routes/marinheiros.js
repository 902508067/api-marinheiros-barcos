const express = require('express');
const router = express.Router();
const marinheirosController = require('../controllers/marinheirosController');

router.get('/marinheiros', marinheirosController.getAll);
router.get('/marinheiros/:id', marinheirosController.getById);
router.post('/marinheiros', marinheirosController.create);
router.put('/marinheiros/:id', marinheirosController.update);
router.delete('/marinheiros/:id', marinheirosController.delete);

module.exports = router;
