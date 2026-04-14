<template>
  <div class="page-container">
    <h1 class="page-title">Dashboard</h1>

    <div class="dashboard-grid">
      <div class="card-dashboard">
        <div class="card-icon">⛵</div>
        <div>
          <h3>Barcos</h3>
          <p class="card-number">{{ totalBarcos }}</p>
        </div>
      </div>

      <div class="card-dashboard">
        <div class="card-icon">👨‍✈️</div>
        <div>
          <h3>Marinheiros</h3>
          <p class="card-number">{{ totalMarinheiros }}</p>
        </div>
      </div>

      <div class="card-dashboard">
        <div class="card-icon">📅</div>
        <div>
          <h3>Reservas Ativas</h3>
          <p class="card-number">{{ totalReservas }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import barcosService from "../services/barcosService";
import marinheirosService from "../services/marinheirosService";
import reservasService from "../services/reservasService";

export default {
  name: "DashboardView",

  data() {
    return {
      totalBarcos: 0,
      totalMarinheiros: 0,
      totalReservas: 0,
    };
  },

  async created() {
    const barcos = await barcosService.getAll();
    const marinheiros = await marinheirosService.getAll();
    const reservas = await reservasService.getAll();

    this.totalBarcos = barcos.length;
    this.totalMarinheiros = marinheiros.length;
    this.totalReservas = reservas.length;
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

/* GRID DO DASHBOARD */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

/* CARD ESTILO BOOKING */
.card-dashboard {
  background: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.card-icon {
  font-size: 40px;
}

.card-dashboard h3 {
  margin: 0;
  font-size: 18px;
  color: var(--text-light);
}

.card-number {
  margin: 4px 0 0;
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-dark);
}
</style>
