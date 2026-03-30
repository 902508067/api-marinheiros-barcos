const express = require('express');
const router = express.Router();

const {
  criarReserva,
  listarReservas,
  listarReservasPorMarinheiro,
  listarReservasPorBarco,
  eliminarReserva,
  atualizarReserva
} = require('../controllers/reservasController');

router.post('/reservas', criarReserva);
router.get('/reservas', listarReservas);
router.get('/reservas/marinheiro/:id', listarReservasPorMarinheiro);
router.get('/reservas/barco/:id', listarReservasPorBarco);


router.put('/reservas/:id', atualizarReserva);

router.delete('/reservas/:id', eliminarReserva);

module.exports = router;
