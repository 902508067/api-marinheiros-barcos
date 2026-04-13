<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/marinheiros">Marinheiros</router-link></li>
      <li><router-link to="/barcos">Barcos</router-link></li>
      <li><router-link to="/reservas">Reservas</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style>
.navbar {
  background: #222;
  padding: 10px;
}

.navbar ul {
  display: flex;
  gap: 20px;
  list-style: none;
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
