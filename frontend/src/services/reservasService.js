import axios from "axios";

const API_URL = "http://localhost:3000/reservas";

export default {
  async getAll() {
    try {
      const response = await axios.get(API_URL);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Erro ao obter reservas:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter reserva:", error);
      return null;
    }
  },

  async create(data) {
    try {
      const payload = {
        id_barco: data.id_barco,
        id_marinheiro: data.id_marinheiro,
        data: data.data // já deve vir em YYYY-MM-DD do formulário
      };

      const response = await axios.post(API_URL, payload);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      return null;
    }
  },

  async update(id, data) {
    try {
      const payload = {
        id_barco: data.id_barco,
        id_marinheiro: data.id_marinheiro,
        data: data.data
      };

      const response = await axios.put(`${API_URL}/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar reserva:", error);
      return null;
    }
  },

  async delete(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Erro ao eliminar reserva:", error);
      return false;
    }
  }
};
