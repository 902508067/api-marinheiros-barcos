import api from "./api";

export default {
  getAll() {
    return api.get("/marinheiros").then(res => res.data);
  },

  create(data) {
    const payload = {
      NOME: data.nome,
      CLASSIFICACAO: data.classificacao,
      IDADE: data.idade
    };
    return api.post("/marinheiros", payload);
  },

  update(id, data) {
    const payload = {
      NOME: data.nome,
      CLASSIFICACAO: data.classificacao,
      IDADE: data.idade
    };
    return api.put(`/marinheiros/${id}`, payload);
  },

  delete(id) {
    return api.delete(`/marinheiros/${id}`);
  }
};
