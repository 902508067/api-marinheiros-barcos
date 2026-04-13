<script setup>
import { ref, onMounted } from 'vue';
import reservasService from '../services/reservasService';
import barcosService from '../services/barcosService';
import marinheirosService from '../services/marinheirosService';
import Tabela from '../components/Tabela.vue';
import ReservaForm from '../components/ReservaForm.vue';
import Mensagem from '../components/Mensagem.vue';

const reservas = ref([]);
const barcosMap = ref({});
const marinheirosMap = ref({});
const reservaSelecionada = ref(null);

// Mensagens de feedback
const mensagemTexto = ref('');
const mensagemTipo = ref('sucesso');

const mostrarMensagem = (texto, tipo = 'sucesso') => {
  mensagemTexto.value = texto;
  mensagemTipo.value = tipo;
};

// Carregar dados iniciais
const carregarDados = async () => {
  try {
    const [reservasRes, barcosRes, marinheirosRes] = await Promise.all([
      reservasService.getReservas(),
      barcosService.getBarcos(),
      marinheirosService.getMarinheiros()
    ]);

    barcosMap.value = Object.fromEntries(
      barcosRes.data.map(b => [b.id_barco, b.nome])
    );

    marinheirosMap.value = Object.fromEntries(
      marinheirosRes.data.map(m => [m.id_marinheiro, m.nome])
    );

    reservas.value = reservasRes.data.map(r => ({
      ...r,
      marinheiro_nome: marinheirosMap.value[r.id_marinheiro],
      barco_nome: barcosMap.value[r.id_barco]
    }));
  } catch (e) {
    mostrarMensagem("Erro ao carregar dados.", "erro");
  }
};

onMounted(carregarDados);

// Iniciar edição
const iniciarEdicao = (reserva) => {
  reservaSelecionada.value = reserva;
};

// Limpar edição
const limparEdicao = () => {
  reservaSelecionada.value = null;
};

// Eliminar reserva
const eliminarReserva = async (id) => {
  try {
    await reservasService.deleteReserva(id);
    mostrarMensagem("Reserva eliminada com sucesso!");
    carregarDados();
  } catch (e) {
    mostrarMensagem("Erro ao eliminar reserva.", "erro");
  }
};
</script>

<template>
  <div>

    <!-- MENSAGEM DE SUCESSO/ERRO -->
    <Mensagem
      v-if="mensagemTexto"
      :texto="mensagemTexto"
      :tipo="mensagemTipo"
    />

    <h1>Reservas</h1>

    <!-- FORMULÁRIO -->
    <ReservaForm
      :reserva="reservaSelecionada"
      @reservaCriada="() => { mostrarMensagem('Reserva criada com sucesso!'); carregarDados(); }"
      @reservaAtualizada="() => { mostrarMensagem('Reserva atualizada com sucesso!'); carregarDados(); limparEdicao(); }"
    />

    <!-- TABELA -->
    <Tabela
      :dados="reservas"
      :colunas="[
        { key: 'id_reserva', label: 'ID' },
        { key: 'marinheiro_nome', label: 'Marinheiro' },
        { key: 'barco_nome', label: 'Barco' },
        { key: 'data_inicio', label: 'Início' },
        { key: 'data_fim', label: 'Fim' }
      ]"
      @edit="iniciarEdicao"
      @delete="eliminarReserva"
    />

  </div>
</template>
