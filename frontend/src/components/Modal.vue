<script setup>
const props = defineProps({
  titulo: { type: String, default: "" },
  visivel: { type: Boolean, default: false }
});

const emit = defineEmits(["fechar"]);
</script>

<template>
  <div v-if="visivel" class="modal-overlay">
    <div class="modal-content">
      <header class="modal-header">
        <h3>{{ titulo }}</h3>
        <button class="fechar" @click="emit('fechar')">X</button>
      </header>

      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 450px;
  max-width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fechar {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-body {
  margin-top: 15px;
}
</style>
