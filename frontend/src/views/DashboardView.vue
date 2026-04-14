<script setup>
import { ref, onMounted } from 'vue';
import marinheirosService from '../services/marinheirosService';
import barcosService from '../services/barcosService';
import reservasService from '../services/reservasService';

const totalMarinheiros = ref(0);
const totalBarcos = ref(0);
const totalReservas = ref(0);

const carregarResumo = async () => {
  try {
    const [m, b, r] = await Promise.all([
      marinheirosService.getMarinheiros(),
      barcosService.getBarcos(),
      reservasService.getReservas()
    ]);

    totalMarinheiros.value = m.data.length;
    totalBarcos.value = b.data.length;
    totalReservas.value = r.data.length;

  } catch (e) {
    console.error("Erro ao carregar resumo do dashboard");
  }
};

onMounted(carregarResumo);
</script>

<template>
  <div>
    <h1>Dashboard</h1>

    <div class="cards">
      <div class="card">
        <h2>{{ totalMarinheiros }}</h2>
        <p>Marinheiros</p>
      </div>

      <div class="card">
        <h2>{{ totalBarcos }}</h2>
        <p>Barcos</p>
      </div>

      <div class="card">
        <h2>{{ totalReservas }}</h2>
        <p>Reservas</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  gap: 20px;
  margin-top: 25px;
}

.card {
  flex: 1;
  background: #f8fafc;
  padding: 25px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.card h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #1e293b;
}

.card p {
  font-size: 1.1rem;
  color: #475569;
}
</style>
