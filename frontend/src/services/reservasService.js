import axios from "axios";

const API = "http://localhost:3000";

export default {
  listar() {
    return axios.get(`${API}/reservas`);
  },
  criar(data) {
    return axios.post(`${API}/reservas`, data);
  },
  atualizar(id, data) {
    return axios.put(`${API}/reservas/${id}`, data);
  },
  apagar(id) {
    return axios.delete(`${API}/reservas/${id}`);
  }
};
