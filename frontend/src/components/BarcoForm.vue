<template>
  <form @submit.prevent="guardar">
    <label>Nome:</label>
    <input v-model="form.nome" required />

    <label>Capacidade:</label>
    <input type="number" v-model="form.capacidade" required />

    <label>Tipo:</label>
    <input v-model="form.tipo" required />

    <button type="submit">
      {{ form.id ? "Atualizar" : "Criar" }}
    </button>
  </form>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps(["modelo"]);
const emit = defineEmits(["guardar"]);

const form = reactive({
  id: null,
  nome: "",
  capacidade: "",
  tipo: ""
});

watch(
  () => props.modelo,
  (novo) => {
    if (novo) Object.assign(form, novo);
  },
  { immediate: true }
);

function guardar() {
  emit("guardar", { ...form });
  form.id = null;
  form.nome = "";
  form.capacidade = "";
  form.tipo = "";
}
</script>
