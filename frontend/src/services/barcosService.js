import axios from "axios";

const API = "http://localhost:3000";

export default {
  listar() {
    return axios.get(`${API}/barcos`);
  },
  criar(data) {
    return axios.post(`${API}/barcos`, data);
  },
  atualizar(id, data) {
    return axios.put(`${API}/barcos/${id}`, data);
  },
  apagar(id) {
    return axios.delete(`${API}/barcos/${id}`);
  }
};
