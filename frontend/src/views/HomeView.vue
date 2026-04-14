<template>
  <div class="home-container">
    <h1 class="title">Náutica App</h1>
    <p class="subtitle">Escolha uma das opções para começar</p>

    <div class="buttons">
      <RouterLink to="/barcos" class="home-btn barcos">Barcos</RouterLink>
      <RouterLink to="/marinheiros" class="home-btn marinheiros">Marinheiros</RouterLink>
      <RouterLink to="/reservas" class="home-btn reservas">Reservas</RouterLink>
    </div>
  </div>
</template>

<style>
.home-container {
  text-align: center;
  margin-top: 5rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #555;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.home-btn {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  transition: 0.2s;
}

.barcos {
  background: #007ad9;
}

.marinheiros {
  background: #28a745;
}

.reservas {
  background: #ff9800;
}

.home-btn:hover {
  opacity: 0.85;
}
</style>
