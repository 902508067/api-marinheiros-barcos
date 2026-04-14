import axios from "axios";

const API_URL = "http://localhost:3000/api/reservas";

export default {
  getAll() {
    return axios.get(API_URL);
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  create(reserva) {
    return axios.post(API_URL, reserva);
  },

  update(id, reserva) {
    return axios.put(`${API_URL}/${id}`, reserva);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
