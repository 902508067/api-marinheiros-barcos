<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import marinheirosService from '../services/marinheirosService';
import Tabela from '../components/Tabela.vue';
import Mensagem from '../components/Mensagem.vue';

const marinheiros = ref([]);
const mensagemTexto = ref('');
const mensagemTipo = ref('sucesso');

const mostrarMensagem = (texto, tipo = 'sucesso') => {
  mensagemTexto.value = texto;
  mensagemTipo.value = tipo;
};

const carregarDados = async () => {
  try {
    const res = await marinheirosService.getMarinheiros();
    marinheiros.value = res.data;
  } catch (e) {
    mostrarMensagem('Erro ao carregar marinheiros.', 'erro');
  }
};

onMounted(carregarDados);

const eliminar = async (id) => {
  try {
    await marinheirosService.deleteMarinheiro(id);
    mostrarMensagem('Marinheiro eliminado com sucesso!');
    await carregarDados();
  } catch (e) {
    mostrarMensagem('Erro ao eliminar marinheiro.', 'erro');
  }
};
</script>

<template>
  <!-- Navbar já está no App.vue, por isso NÃO repetimos aqui -->

  <div>
    <Mensagem
      v-if="mensagemTexto"
      :texto="mensagemTexto"
      :tipo="mensagemTipo"
    />

    <h1>Marinheiros</h1>

    <Tabela
      :dados="marinheiros"
      :colunas="[
        { key: 'ID_MARINHEIRO', label: 'ID' },
        { key: 'NOME', label: 'Nome' },
        { key: 'IDADE', label: 'Idade' }
      ]"
      @delete="eliminar"
    />
  </div>
</template>
