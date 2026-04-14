<template>
  <nav class="nav-booking">
    <div class="nav-left">
      <span class="logo">BoatBooking</span>
    </div>

    <div class="nav-right">
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/marinheiros">Marinheiros</RouterLink>
      <RouterLink to="/barcos">Barcos</RouterLink>
      <RouterLink to="/reservas">Reservas</RouterLink>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.nav-booking {
  background: #003580; /* azul Booking */
  color: #fff;
  padding: 14px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.logo {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-right {
  display: flex;
  gap: 24px;
}

.nav-right a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  padding-bottom: 2px;
  transition: 0.2s;
}

.nav-right a:hover {
  opacity: 0.8;
}

.nav-right a.router-link-active {
  border-bottom: 2px solid #fff;
}
</style>
