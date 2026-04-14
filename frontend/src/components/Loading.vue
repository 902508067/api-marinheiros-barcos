<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p>A carregar...</p>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  color: var(--primary);
  font-weight: 600;
  font-size: 16px;
}

/* Spinner estilo Booking */
.spinner {
  width: 42px;
  height: 42px;
  border: 4px solid #dbeafe; /* azul muito claro */
  border-top-color: var(--primary); /* azul Booking */
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
