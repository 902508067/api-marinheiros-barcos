import api from './api';

export default {
  getReservas() {
    return api.get('/reservas');
  },
  createReserva(data) {
    return api.post('/reservas', data);
  },
  updateReserva(id, data) {
    return api.put(`/reservas/${id}`, data);
  },
  deleteReserva(id) {
    return api.delete(`/reservas/${id}`);
  }
};
