<template>
  <div class="page-container">
    <h1 class="page-title">Barcos Disponíveis</h1>

    <div class="boats-grid">
      <div v-for="barco in barcos" :key="barco.id" class="boat-card">
        <div class="boat-header">
          <h3>{{ barco.nome }}</h3>
          <span class="boat-capacidade">{{ barco.capacidade }} pessoas</span>
        </div>

        <p class="boat-descricao">
          {{ barco.descricao || "Sem descrição disponível." }}
        </p>

        <div class="boat-footer">
          <span class="boat-preco">€ {{ barco.precoPorDia }} / dia</span>
          <button @click="editarBarco(barco)">Editar</button>
        </div>
      </div>
    </div>

    <button class="add-button" @click="criarBarco">
      + Adicionar Barco
    </button>
  </div>
</template>

<script>
import barcosService from "../services/barcosService";

export default {
  name: "BarcosView",

  data() {
    return {
      barcos: [],
    };
  },

  async created() {
    this.barcos = await barcosService.getAll();
  },

  methods: {
    criarBarco() {
      this.$router.push("/barcos/novo");
    },
    editarBarco(barco) {
      this.$router.push(`/barcos/${barco.id}`);
    },
  },
};
</script>

<style scoped>
.page-container {
  padding: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--primary);
}

.boats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.boat-card {
  background: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.boat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.boat-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.boat-capacidade {
  font-size: 14px;
  color: var(--text-light);
}

.boat-descricao {
  font-size: 14px;
  color: var(--text-light);
  line-height: 1.4;
}

.boat-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.boat-preco {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-dark);
}

.add-button {
  margin-top: 32px;
  background: var(--accent);
  color: #000;
  font-weight: 700;
  padding: 12px 20px;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.add-button:hover {
  background: #ffcc33;
}
</style>
