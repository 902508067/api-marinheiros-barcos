<script setup>
import { ref, onMounted } from "vue";
import barcosService from "../services/barcosService.js";
import Tabela from "../components/Tabela.vue";
import BarcoForm from "../components/BarcoForm.vue";

const barcos = ref([]);
const selecionado = ref(null);

async function carregar() {
  const res = await barcosService.listar();
  barcos.value = res.data;
}

function editar(item) {
  selecionado.value = { ...item };
}

async function apagar(id) {
  await barcosService.apagar(id);
  carregar();
}

async function guardar(barco) {
  if (barco.id) {
    await barcosService.atualizar(barco.id, barco);
  } else {
    await barcosService.criar(barco);
  }

  selecionado.value = null;
  carregar();
}

onMounted(carregar);
</script>

<template>
  <h1>Gestão de Barcos</h1>

  <BarcoForm :modelo="selecionado" @guardar="guardar" />

  <Tabela
    :dados="barcos"
    :colunas="['id_barco', 'nome', 'capacidade', 'tipo']"
    @editar="editar"
    @apagar="apagar"
  />
</template>
