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
  <div v-if="visivel"
       :style="{
         padding: '10px',
         marginBottom: '10px',
         borderRadius: '5px',
         color: 'white',
         fontWeight: 'bold',
         backgroundColor: tipo === 'erro' ? '#d9534f' : '#5cb85c'
       }">
    {{ texto }}
  </div>
</template>
