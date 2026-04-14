<script setup>
import Navbar from '../components/Navbar.vue';
</script>

<template>
  <Navbar />

  <div class="p-4">
    <div class="text-center mt-6">
      <h1 class="text-4xl font-bold mb-3">Bem-vindo ao Sistema de Gestão Náutica</h1>
      <p class="text-lg text-gray-600">
        Utilize o menu acima para navegar entre Barcos, Marinheiros e Reservas.
      </p>
    </div>

    <div class="grid mt-6">
      <div class="col-12 md:col-4">
        <div class="card shadow-2 p-4 border-round text-center">
          <i class="pi pi-ship text-5xl text-blue-500 mb-3"></i>
          <h3 class="m-0">Gestão de Barcos</h3>
        </div>
      </div>

      <div class="col-12 md:col-4">
        <div class="card shadow-2 p-4 border-round text-center">
          <i class="pi pi-users text-5xl text-green-500 mb-3"></i>
          <h3 class="m-0">Gestão de Marinheiros</h3>
        </div>
      </div>

      <div class="col-12 md:col-4">
        <div class="card shadow-2 p-4 border-round text-center">
          <i class="pi pi-calendar text-5xl text-purple-500 mb-3"></i>
          <h3 class="m-0">Gestão de Reservas</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-2 {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style>
