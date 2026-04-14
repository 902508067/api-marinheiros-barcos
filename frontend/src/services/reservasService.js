import api from './api';

export default {
  async getAll() {
    const res = await api.get('/reservas');
    return res.data;
  },

  async getReservas() {
    const res = await api.get('/reservas');
    return res.data;
  },

  async getReserva(id) {
    const res = await api.get(`/reservas/${id}`);
    return res.data;
  },

  async createReserva(data) {
    const res = await api.post('/reservas', data);
    return res.data;
  },

  async updateReserva(id, data) {
    const res = await api.put(`/reservas/${id}`, data);
    return res.data;
  },

  async deleteReserva(id) {
    const res = await api.delete(`/reservas/${id}`);
    return res.data;
  }
};
