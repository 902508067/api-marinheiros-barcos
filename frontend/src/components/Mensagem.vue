<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  tipo: { type: String, default: "sucesso" }, // "sucesso" ou "erro"
  texto: { type: String, required: true },
  duracao: { type: Number, default: 3000 }
});

const visivel = ref(true);

watch(() => props.texto, () => {
  visivel.value = true;
  setTimeout(() => visivel.value = false, props.duracao);
});
</script>

<template>
  <transition name="fade">
    <div
      v-if="visivel"
      class="mensagem"
      :class="tipo === 'erro' ? 'erro' : 'sucesso'"
    >
      {{ texto }}
    </div>
  </transition>
</template>

<style scoped>
.mensagem {
  padding: 12px 16px;
  margin-bottom: 15px;
  border-radius: 6px;
  font-weight: bold;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}

/* Tipos */
.sucesso {
  background-color: #22c55e; /* verde */
}

.erro {
  background-color: #ef4444; /* vermelho */
}

/* Animação */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
