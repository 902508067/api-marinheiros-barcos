<script setup>
import Navbar from '../components/Navbar.vue';
</script>

<template>
  <Navbar />

  <div class="p-4">
    <div class="card shadow-2 p-5 border-round">
      <h1 class="text-3xl font-bold mb-3">Sobre o Sistema de Gestão Náutica</h1>

      <p class="text-lg text-gray-700 mb-4">
        Este sistema foi desenvolvido para simplificar a gestão de barcos, marinheiros e reservas,
        oferecendo uma interface moderna, rápida e intuitiva.
      </p>

      <h2 class="text-2xl font-semibold mt-4 mb-2">Funcionalidades Principais</h2>
      <ul class="list-disc ml-5 text-gray-700">
        <li>Gestão completa de barcos</li>
        <li>Registo e administração de marinheiros</li>
        <li>Criação e controlo de reservas</li>
        <li>Dashboard com indicadores em tempo real</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-5 mb-2">Tecnologias Utilizadas</h2>
      <ul class="list-disc ml-5 text-gray-700">
        <li>Vue 3 + Vite</li>
        <li>PrimeVue 4</li>
        <li>PrimeFlex</li>
        <li>Axios</li>
        <li>API REST em Node.js / Express</li>
        <li>Base de dados Oracle</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-5 mb-2">Objetivo</h2>
      <p class="text-gray-700">
        Criar uma solução prática e eficiente para operações náuticas, garantindo rapidez,
        organização e facilidade de uso tanto para administradores como para operadores.
      </p>

      <p class="mt-6 text-sm text-gray-500">
        © {{ new Date().getFullYear() }} Sistema de Gestão Náutica — Todos os direitos reservados.
      </p>
    </div>
  </div>
</template>

<style scoped>
.shadow-2 {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style>
