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
              <p class="text-2xl font-bold m-0">12</p>
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
              <p class="text-2xl font-bold m-0">8</p>
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
              <h3 class="m-0">Reservas</h3>
              <p class="text-2xl font-bold m-0">5</p>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <!-- Secção extra opcional -->
    <div class="mt-5">
      <Card class="shadow-2 p-4 border-round">
        <h2 class="text-2xl font-bold mb-3">Bem-vindo à aplicação Náutica</h2>
        <p class="text-lg">
          Aqui podes gerir barcos, marinheiros e reservas de forma simples e rápida.
        </p>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from 'primevue/card';

export default {
  name: "DashboardView",
  components: { Card }
};
</script>

<style scoped>
.shadow-2 {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style>
