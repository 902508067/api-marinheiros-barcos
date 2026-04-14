import axios from "axios";

const API_URL = "http://localhost:3000/barcos";

export default {
  async getAll() {
    try {
      const response = await axios.get(API_URL);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Erro ao obter barcos:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter barco:", error);
      return null;
    }
  },

  async create(data) {
    try {
      const response = await axios.post(API_URL, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar barco:", error);
      return null;
    }
  },

  async update(id, data) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar barco:", error);
      return null;
    }
  },

  async delete(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Erro ao eliminar barco:", error);
      return false;
    }
  }
};
