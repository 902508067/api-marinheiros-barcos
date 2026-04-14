import api from './api';

export default {
  async getAll() {
    const res = await api.get('/barcos');
    return res.data;
  },

  async getBarcos() {
    const res = await api.get('/barcos');
    return res.data;
  },

  async getBarco(id) {
    const res = await api.get(`/barcos/${id}`);
    return res.data;
  },

  async createBarco(data) {
    const res = await api.post('/barcos', data);
    return res.data;
  },

  async updateBarco(id, data) {
    const res = await api.put(`/barcos/${id}`, data);
    return res.data;
  },

  async deleteBarco(id) {
    const res = await api.delete(`/barcos/${id}`);
    return res.data;
  }
};
