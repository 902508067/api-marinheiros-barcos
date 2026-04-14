<template>
  <div class="loading-wrapper">
    <ProgressSpinner 
      style="width: 60px; height: 60px" 
      strokeWidth="4"
      animationDuration=".8s"
    />
    <p class="loading-text">A carregar...</p>
  </div>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner';

export default {
  name: "Loading",
  components: {
    ProgressSpinner
  }
};
</script>

<style scoped>
.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-text {
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #555;
}
</style>
