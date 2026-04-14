import api from './api';

export default {
  async getAll() {
    const res = await api.get('/marinheiros');
    return res.data;
  },

  async getMarinheiros() {
    const res = await api.get('/marinheiros');
    return res.data;
  },

  async getMarinheiro(id) {
    const res = await api.get(`/marinheiros/${id}`);
    return res.data;
  },

  async createMarinheiro(data) {
    const res = await api.post('/marinheiros', data);
    return res.data;
  },

  async updateMarinheiro(id, data) {
    const res = await api.put(`/marinheiros/${id}`, data);
    return res.data;
  },

  async deleteMarinheiro(id) {
    const res = await api.delete(`/marinheiros/${id}`);
    return res.data;
  }
};
