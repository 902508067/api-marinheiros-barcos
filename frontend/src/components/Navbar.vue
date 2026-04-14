<template>
  <nav class="navbar">
    <RouterLink to="/">Dashboard</RouterLink>
    <RouterLink to="/marinheiros">Marinheiros</RouterLink>
    <RouterLink to="/barcos">Barcos</RouterLink>
    <RouterLink to="/reservas">Reservas</RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar {
  display: flex;
  gap: 20px;
  background: #1e293b;
  padding: 15px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.navbar a.router-link-active {
  text-decoration: underline;
}
</style>
