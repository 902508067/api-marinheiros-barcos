<template>
  <div class="page-container">
    <h1 class="page-title">Reservas</h1>

    <!-- Barra de pesquisa estilo Booking -->
    <div class="search-bar">
      <input
        v-model="filtroTexto"
        type="text"
        placeholder="Pesquisar por barco, marinheiro ou destino"
      />

      <input v-model="dataInicio" type="date" />
      <input v-model="dataFim" type="date" />

      <button @click="aplicarFiltros">Procurar</button>
    </div>

    <!-- Cards das reservas -->
    <div class="reservas-grid">
      <div v-for="reserva in reservasFiltradas" :key="reserva.id" class="reserva-card">
        <div class="reserva-header">
          <h3>{{ reserva.barco?.nome || "Barco" }}</h3>
          <span class="reserva-datas">
            {{ reserva.dataInicio }} → {{ reserva.dataFim }}
          </span>
        </div>

        <p class="reserva-info">
          Marinheiro: <strong>{{ reserva.marinheiro?.nome }}</strong>
        </p>

        <p class="reserva-info">
          Preço total: <strong>€ {{ reserva.precoTotal }}</strong>
        </p>

        <div class="reserva-footer">
          <button @click="editarReserva(reserva)">Editar</button>
          <button class="delete-btn" @click="eliminarReserva(reserva.id)">Eliminar</button>
        </div>
      </div>
    </div>

    <button class="add-button" @click="criarReserva">
      + Criar Reserva
    </button>
  </div>
</template>

<script>
import reservasService from "../services/reservasService";

export default {
  name: "ReservasView",

  data() {
    return {
      reservas: [],
      filtroTexto: "",
      dataInicio: "",
      dataFim: "",
    };
  },

  async created() {
    this.reservas = await reservasService.getAll();
  },

  computed: {
    reservasFiltradas() {
      return this.reservas.filter((r) => {
        const texto = this.filtroTexto.toLowerCase();

        const matchTexto =
          r.barco?.nome.toLowerCase().includes(texto) ||
          r.marinheiro?.nome.toLowerCase().includes(texto);

        const matchDataInicio = this.dataInicio
          ? r.dataInicio >= this.dataInicio
          : true;

        const matchDataFim = this.dataFim
          ? r.dataFim <= this.dataFim
          : true;

        return matchTexto && matchDataInicio && matchDataFim;
      });
    },
  },

  methods: {
    aplicarFiltros() {
      // A filtragem já é reativa via computed
    },
    criarReserva() {
      this.$router.push("/reservas/nova");
    },
    editarReserva(reserva) {
      this.$router.push(`/reservas/${reserva.id}`);
    },
    async eliminarReserva(id) {
      await reservasService.delete(id);
      this.reservas = this.reservas.filter((r) => r.id !== id);
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

/* Barra de pesquisa estilo Booking */
.search-bar {
  background: #fff;
  padding: 16px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 10px;
  margin-bottom: 24px;
}

.search-bar input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
}

.search-bar input:focus {
  outline: none;
  border-color: var(--primary);
}

/* Cards das reservas */
.reservas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.reserva-card {
  background: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reserva-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reserva-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.reserva-datas {
  font-size: 14px;
  color: var(--text-light);
}

.reserva-info {
  font-size: 14px;
  color: var(--text-light);
}

.reserva-footer {
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
