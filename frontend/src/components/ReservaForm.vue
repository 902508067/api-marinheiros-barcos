<script setup>
import { ref, watch, onMounted } from 'vue';
import reservasService from '../services/reservasService';
import barcosService from '../services/barcosService';
import marinheirosService from '../services/marinheirosService';

const props = defineProps({
  reserva: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['reservaCriada', 'reservaAtualizada']);

const id_marinheiro = ref('');
const id_barco = ref('');
const data_inicio = ref('');
const data_fim = ref('');

const marinheiros = ref([]);
const barcos = ref([]);

const erro = ref('');

onMounted(async () => {
  marinheiros.value = (await marinheirosService.getMarinheiros()).data;
  barcos.value = (await barcosService.getBarcos()).data;
});

// Preencher o formulário quando entra em modo edição
watch(
  () => props.reserva,
  (nova) => {
    if (nova) {
      id_marinheiro.value = nova.id_marinheiro;
      id_barco.value = nova.id_barco;
      data_inicio.value = nova.data_inicio;
      data_fim.value = nova.data_fim;
    } else {
      id_marinheiro.value = '';
      id_barco.value = '';
      data_inicio.value = '';
      data_fim.value = '';
    }
  },
  { immediate: true }
);

const validar = () => {
  erro.value = '';

  if (!id_marinheiro.value) {
    erro.value = 'Selecione um marinheiro.';
    return false;
  }

  if (!id_barco.value) {
    erro.value = 'Selecione um barco.';
    return false;
  }

  if (!data_inicio.value || !data_fim.value) {
    erro.value = 'Preencha ambas as datas.';
    return false;
  }

  if (data_inicio.value > data_fim.value) {
    erro.value = 'A data de início não pode ser depois da data de fim.';
    return false;
  }

  return true;
};

const guardar = async () => {
  if (!validar()) return;

  const payload = {
    id_marinheiro: id_marinheiro.value,
    id_barco: id_barco.value,
    data_inicio: data_inicio.value,
    data_fim: data_fim.value
  };

  if (props.reserva) {
    await reservasService.updateReserva(props.reserva.id_reserva, payload);
    emit('reservaAtualizada');
  } else {
    await reservasService.createReserva(payload);
    emit('reservaCriada');
  }
};
</script>

<template>
  <form @submit.prevent="guardar">
    <h3>{{ reserva ? "Editar Reserva" : "Criar Reserva" }}</h3>

    <p v-if="erro" style="color: red; font-weight: bold;">
      {{ erro }}
    </p>

    <label>Marinheiro:</label>
    <select v-model="id_marinheiro">
      <option disabled value="">Selecione</option>
      <option v-for="m in marinheiros" :key="m.id_marinheiro" :value="m.id_marinheiro">
        {{ m.nome }}
      </option>
    </select>

    <label>Barco:</label>
    <select v-model="id_barco">
      <option disabled value="">Selecione</option>
      <option v-for="b in barcos" :key="b.id_barco" :value="b.id_barco">
        {{ b.nome }}
      </option>
    </select>

    <label>Data início:</label>
    <input type="date" v-model="data_inicio" />

    <label>Data fim:</label>
    <input type="date" v-model="data_fim" />

    <button type="submit">
      {{ reserva ? "Guardar Alterações" : "Criar Reserva" }}
    </button>
  </form>
</template>
