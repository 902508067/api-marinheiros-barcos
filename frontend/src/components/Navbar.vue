<template>
  <nav class="navbar shadow-2">
    <div class="navbar-left">
      <i class="pi pi-compass text-2xl mr-2"></i>
      <span class="navbar-title">Náutica App</span>
    </div>

    <div class="navbar-right">
      <RouterLink to="/" class="nav-link">
        <i class="pi pi-home mr-1"></i> Dashboard
      </RouterLink>

      <RouterLink to="/barcos" class="nav-link">
        <i class="pi pi-ship mr-1"></i> Barcos
      </RouterLink>

      <RouterLink to="/marinheiros" class="nav-link">
        <i class="pi pi-users mr-1"></i> Marinheiros
      </RouterLink>

      <RouterLink to="/reservas" class="nav-link">
        <i class="pi pi-calendar mr-1"></i> Reservas
      </RouterLink>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
.navbar {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-title {
  font-size: 1.4rem;
  font-weight: bold;
}

.navbar-right {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: 0.2s;
}

.nav-link:hover {
  color: #007ad9;
}
</style>
