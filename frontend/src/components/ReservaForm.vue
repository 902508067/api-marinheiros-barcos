<template>
  <form @submit.prevent="guardar">
    <label>Marinheiro:</label>
    <select v-model="form.id_marinheiro" required>
      <option disabled value="">Selecione...</option>
      <option v-for="m in marinheiros" :key="m.id_marinheiro" :value="m.id_marinheiro">
        {{ m.nome }}
      </option>
    </select>

    <label>Barco:</label>
    <select v-model="form.id_barco" required>
      <option disabled value="">Selecione...</option>
      <option v-for="b in barcos" :key="b.id_barco" :value="b.id_barco">
        {{ b.nome }}
      </option>
    </select>

    <label>Data:</label>
    <input type="date" v-model="form.data" required />

    <button type="submit">
      {{ form.id_reserva ? "Atualizar" : "Criar" }}
    </button>
  </form>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps(["modelo", "marinheiros", "barcos"]);
const emit = defineEmits(["guardar"]);

const form = reactive({
  id_reserva: null,
  id_marinheiro: "",
  id_barco: "",
  data: ""
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
  form.id_reserva = null;
  form.id_marinheiro = "";
  form.id_barco = "";
  form.data = "";
}
</script>
