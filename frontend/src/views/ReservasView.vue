<script setup>
import { ref, onMounted } from 'vue';
import reservasService from '../services/reservasService';
import barcosService from '../services/barcosService';
import marinheirosService from '../services/marinheirosService';
import Tabela from '../components/Tabela.vue';
import Mensagem from '../components/Mensagem.vue';

const reservas = ref([]);
const barcosMap = ref({});
const marinheirosMap = ref({});

const mensagemTexto = ref('');
const mensagemTipo = ref('sucesso');

const mostrarMensagem = (texto, tipo = 'sucesso') => {
  mensagemTexto.value = texto;
  mensagemTipo.value = tipo;
};

const carregarDados = async () => {
  try {
    const [reservasRes, barcosRes, marinheirosRes] = await Promise.all([
      reservasService.getReservas(),
      barcosService.getBarcos(),
      marinheirosService.getMarinheiros()
    ]);

    // Mapear barcos por ID
    barcosMap.value = Object.fromEntries(
      barcosRes.data.map(b => [b.ID_BARCO, b.NOME])
    );

    // Mapear marinheiros por ID
    marinheirosMap.value = Object.fromEntries(
      marinheirosRes.data.map(m => [m.ID_MARINHEIRO, m.NOME])
    );

    // Enriquecer reservas com nomes
    reservas.value = reservasRes.data.map(r => ({
      ...r,
      MARINHEIRO_NOME: marinheirosMap.value[r.ID_MARINHEIRO],
      BARCO_NOME: barcosMap.value[r.ID_BARCO],
      DATA: r.DATA
    }));

  } catch (e) {
    mostrarMensagem('Erro ao carregar reservas.', 'erro');
  }
};

onMounted(carregarDados);

const eliminarReserva = async (id) => {
  try {
    await reservasService.deleteReserva(id);
    mostrarMensagem('Reserva eliminada com sucesso!');
    await carregarDados();
  } catch (e) {
    mostrarMensagem('Erro ao eliminar reserva.', 'erro');
  }
};
</script>

<template>
  <div>
    <Mensagem
      v-if="mensagemTexto"
      :texto="mensagemTexto"
      :tipo="mensagemTipo"
    />

    <h1>Reservas</h1>

    <Tabela
      :dados="reservas"
      :colunas="[
        { key: 'ID_RESERVA', label: 'ID' },
        { key: 'MARINHEIRO_NOME', label: 'Marinheiro' },
        { key: 'BARCO_NOME', label: 'Barco' },
        { key: 'DATA', label: 'Data' }
      ]"
      @delete="eliminarReserva"
    />
  </div>
</template>
