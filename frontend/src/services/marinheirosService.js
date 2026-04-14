import axios from "axios";

const API_URL = "http://localhost:3000/api/marinheiros";

export default {
  getAll() {
    return axios.get(API_URL);
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  create(marinheiro) {
    return axios.post(API_URL, marinheiro);
  },

  update(id, marinheiro) {
    return axios.put(`${API_URL}/${id}`, marinheiro);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
