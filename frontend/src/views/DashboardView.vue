<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>

    <div class="grid">
      <!-- Card Barcos -->
      <div class="col-12 md:col-4">
        <Card class="shadow-2 p-3 border-round">
          <div class="flex align-items-center">
            <i class="pi pi-ship text-4xl text-blue-500 mr-3"></i>
            <div>
              <h3 class="m-0">Barcos</h3>
              <p class="text-2xl font-bold m-0">{{ totalBarcos }}</p>
            </div>
          </div>
        </Card>
      </div>

      <!-- Card Marinheiros -->
      <div class="col-12 md:col-4">
        <Card class="shadow-2 p-3 border-round">
          <div class="flex align-items-center">
            <i class="pi pi-users text-4xl text-green-500 mr-3"></i>
            <div>
              <h3 class="m-0">Marinheiros</h3>
              <p class="text-2xl font-bold m-0">{{ totalMarinheiros }}</p>
            </div>
          </div>
        </Card>
      </div>

      <!-- Card Reservas -->
      <div class="col-12 md:col-4">
        <Card class="shadow-2 p-3 border-round">
          <div class="flex align-items-center">
            <i class="pi pi-calendar text-4xl text-purple-500 mr-3"></i>
            <div>
              <h3 class="m-0">Reservas Ativas</h3>
              <p class="text-2xl font-bold m-0">{{ totalReservas }}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from 'primevue/card';
import barcosService from "../services/barcosService";
import marinheirosService from "../services/marinheirosService";
import reservasService from "../services/reservasService";

export default {
  name: "DashboardView",

  components: {
    Card
  },

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
.shadow-2 {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style>

