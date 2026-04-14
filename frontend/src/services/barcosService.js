import api from './api';

export default {
  getBarcos() {
    return api.get('/barcos');
  },

  getBarco(id) {
    return api.get(`/barcos/${id}`);
  },

  createBarco(data) {
    return api.post('/barcos', data);
  },

  updateBarco(id, data) {
    return api.put(`/barcos/${id}`, data);
  },

  deleteBarco(id) {
    return api.delete(`/barcos/${id}`);
  }
};
