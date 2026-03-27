const express = require('express');
const router = express.Router();
const { criarMarinheiro } = require('../controllers/marinheirosController');

router.post('/marinheiros', criarMarinheiro);

module.exports = router;
