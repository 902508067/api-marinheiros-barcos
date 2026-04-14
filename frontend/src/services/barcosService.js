import api from "./api";

export default {
  getAll() {
    return api.get("/barcos").then(res => res.data);
  },

  create(data) {
    const payload = {
      NOME: data.nome,
      COR: data.cor
    };
    return api.post("/barcos", payload);
  },

  update(id, data) {
    const payload = {
      NOME: data.nome,
      COR: data.cor
    };
    return api.put(`/barcos/${id}`, payload);
  },

  delete(id) {
    return api.delete(`/barcos/${id}`);
  }
};
