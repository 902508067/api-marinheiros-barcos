<template>
  <div class="page-container">
    <h1 class="page-title">Marinheiros</h1>

    <div class="marinheiros-grid">
      <div
        v-for="marinheiro in marinheiros"
        :key="marinheiro.id"
        class="marinheiro-card"
      >
        <div class="marinheiro-header">
          <h3>{{ marinheiro.nome }}</h3>
          <span class="marinheiro-idade">{{ marinheiro.idade }} anos</span>
        </div>

        <p class="marinheiro-info">
          Experiência: <strong>{{ marinheiro.experiencia }} anos</strong>
        </p>

        <p class="marinheiro-info">
          Especialidade: <strong>{{ marinheiro.especialidade }}</strong>
        </p>

        <div class="marinheiro-footer">
          <button @click="editarMarinheiro(marinheiro)">Editar</button>
          <button class="delete-btn" @click="eliminarMarinheiro(marinheiro.id)">
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <button class="add-button" @click="criarMarinheiro">
      + Adicionar Marinheiro
    </button>
  </div>
</template>

<script>
import marinheirosService from "../services/marinheirosService";

export default {
  name: "MarinheirosView",

  data() {
    return {
      marinheiros: [],
    };
  },

  async created() {
    this.marinheiros = await marinheirosService.getAll();
  },

  methods: {
    criarMarinheiro() {
      this.$router.push("/marinheiros/novo");
    },
    editarMarinheiro(marinheiro) {
      this.$router.push(`/marinheiros/${marinheiro.id}`);
    },
    async eliminarMarinheiro(id) {
      await marinheirosService.delete(id);
      this.marinheiros = this.marinheiros.filter((m) => m.id !== id);
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

/* GRID */
.marinheiros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

/* CARD */
.marinheiro-card {
  background: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.marinheiro-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.marinheiro-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.marinheiro-idade {
  font-size: 14px;
  color: var(--text-light);
}

.marinheiro-info {
  font-size: 14px;
  color: var(--text-light);
}

.marinheiro-footer {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.delete-btn {
  background: #d9534f;
}

.delete-btn:hover {
  background: #c9302c;
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
