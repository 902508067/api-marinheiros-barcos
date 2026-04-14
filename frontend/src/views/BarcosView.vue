<script setup>
import { ref, onMounted } from 'vue';
import barcosService from '../services/barcosService';
import BarcoForm from '../components/BarcoForm.vue';
import Tabela from '../components/Tabela.vue';
import Mensagem from '../components/Mensagem.vue';

const barcos = ref([]);
const mensagemTexto = ref('');
const mensagemTipo = ref('sucesso');

const mostrarMensagem = (texto, tipo = 'sucesso') => {
  mensagemTexto.value = texto;
  mensagemTipo.value = tipo;
};

const carregar = async () => {
  try {
    const res = await barcosService.getBarcos();
    barcos.value = res.data;
  } catch (e) {
    mostrarMensagem('Erro ao carregar barcos.', 'erro');
  }
};

onMounted(carregar);

const eliminar = async (id) => {
  try {
    await barcosService.deleteBarco(id);
    mostrarMensagem('Barco eliminado com sucesso!');
    await carregar();
  } catch (e) {
    mostrarMensagem('Erro ao eliminar barco.', 'erro');
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

    <h1>Gestão de Barcos</h1>

    <BarcoForm @barcoCriado="carregar" />

    <Tabela
      :dados="barcos"
      :colunas="[
        { key: 'ID_BARCO', label: 'ID' },
        { key: 'NOME', label: 'Nome' },
        { key: 'CAPACIDADE', label: 'Capacidade' },
        { key: 'TIPO', label: 'Tipo' }
      ]"
      @delete="eliminar"
    />
  </div>
</template>
