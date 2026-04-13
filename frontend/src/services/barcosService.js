import axios from "axios";

const API = "http://localhost:3000/barcos";

export default {
  listar() {
    return axios.get(API);
  },
  criar(dados) {
    return axios.post(API, dados);
  },
  atualizar(id, dados) {
    return axios.put(`${API}/${id}`, dados);
  },
  apagar(id) {
    return axios.delete(`${API}/${id}`);
  }
};
