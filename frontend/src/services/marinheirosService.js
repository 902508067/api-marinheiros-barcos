import api from './api';

export default {
  getMarinheiros() {
    return api.get('/marinheiros');
  },

  getMarinheiro(id) {
    return api.get(`/marinheiros/${id}`);
  },

  createMarinheiro(data) {
    return api.post('/marinheiros', data);
  },

  updateMarinheiro(id, data) {
    return api.put(`/marinheiros/${id}`, data);
  },

  deleteMarinheiro(id) {
    return api.delete(`/marinheiros/${id}`);
  }
};
