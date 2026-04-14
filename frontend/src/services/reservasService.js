import api from "./api";

export default {
  getAll() {
    return api.get("/reservas").then(res => res.data);
  },

  create(data) {
    const payload = {
      ID_BARCO: data.id_barco,
      ID_MARINHEIRO: data.id_marinheiro,
      DATA: data.data
    };
    return api.post("/reservas", payload);
  },

  update(id, data) {
    const payload = {
      ID_BARCO: data.id_barco,
      ID_MARINHEIRO: data.id_marinheiro,
      DATA: data.data
    };
    return api.put(`/reservas/${id}`, payload);
  },

  delete(id) {
    return api.delete(`/reservas/${id}`);
  }
};
