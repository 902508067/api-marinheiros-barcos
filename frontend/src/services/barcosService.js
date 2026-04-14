import axios from "axios";

const API_URL = "http://localhost:3000/api/barcos";

export default {
  getAll() {
    return axios.get(API_URL);
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  create(barco) {
    return axios.post(API_URL, barco);
  },

  update(id, barco) {
    return axios.put(`${API_URL}/${id}`, barco);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
