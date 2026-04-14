import axios from "axios";

const API_URL = "http://localhost:3000/marinheiros";

export default {
  async getAll() {
    try {
      const response = await axios.get(API_URL);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Erro ao obter marinheiros:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter marinheiro:", error);
      return null;
    }
  },

  async create(data) {
    try {
      const payload = {
        nome: data.nome,
        classificacao: data.classificacao,
        idade: data.idade
      };

      const response = await axios.post(API_URL, payload);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar marinheiro:", error);
      return null;
    }
  },

  async update(id, data) {
    try {
      const payload = {
        nome: data.nome,
        classificacao: data.classificacao,
        idade: data.idade
      };

      const response = await axios.put(`${API_URL}/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar marinheiro:", error);
      return null;
    }
  },

  async delete(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Erro ao eliminar marinheiro:", error);
      return false;
    }
  }
};
