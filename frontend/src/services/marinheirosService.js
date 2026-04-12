import axios from "axios";

const API = "http://localhost:3000";

export default {
  listar() {
    return axios.get(`${API}/marinheiros`);
  },
  criar(data) {
    return axios.post(`${API}/marinheiros`, data);
  },
  atualizar(id, data) {
    return axios.put(`${API}/marinheiros/${id}`, data);
  },
  apagar(id) {
    return axios.delete(`${API}/marinheiros/${id}`);
  }
};
