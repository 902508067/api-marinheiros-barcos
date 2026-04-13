<script setup>
import { ref, onMounted } from "vue";

import reservasService from "../services/reservasService.js";
import marinheirosService from "../services/marinheirosService.js";
import barcosService from "../services/barcosService.js";

import Tabela from "../components/Tabela.vue";
import ReservaForm from "../components/ReservaForm.vue";

const reservas = ref([]);
const marinheiros = ref([]);
const barcos = ref([]);
const selecionado = ref(null);

// -----------------------------
// CARREGAR DADOS (RESERVAS + MARINHEIROS + BARCOS)
// -----------------------------
async function carregar() {
  try {
    const [r, m, b] = await Promise.all([
      reservasService.listar(),
      marinheirosService.listar(),
      barcosService.listar()
    ]);

    marinheiros.value = m.data;
    barcos.value = b.data;

    // Mapear reservas para incluir nomes
    reservas.value = r.data.map(reserva => {
      const marinheiro = m.data.find(x => x.ID_MARINHEIRO === reserva.ID_MARINHEIRO);
      const barco = b.data.find(x => x.ID_BARCO === reserva.ID_BARCO);

      return {
        ...reserva,
        nome_marinheiro: marinheiro ? marinheiro.NOME : "—",
        nome_barco: barco ? barco.NOME : "—"
      };
    });

  } catch (err) {
    console.error("Erro ao carregar dados:", err);
  }
}

// -----------------------------
// EDITAR
// -----------------------------
function editar(item) {
  selecionado.value = { ...item };
}

// -----------------------------
// APAGAR
// -----------------------------
async function apagar(id) {
  await reservasService.apagar(id);
  carregar();
}

// -----------------------------
// GUARDAR (CRIAR OU ATUALIZAR)
// -----------------------------
async function guardar(reserva) {
  if (reserva.ID_RESERVA) {
    await reservasService.atualizar(reserva.ID_RESERVA, reserva);
  } else {
    await reservasService.criar(reserva);
  }

  selecionado.value = null;
  carregar();
}

onMounted(carregar);
</script>

<template>
  <h1>Gestão de Reservas</h1>

  <ReservaForm
    :modelo="selecionado"
    :marinheiros="marinheiros"
    :barcos="barcos"
    @guardar="guardar"
  />

  <Tabela
    :dados="reservas"
    :colunas="['ID_RESERVA', 'nome_marinheiro', 'nome_barco', 'DATA']"
    @editar="editar"
    @apagar="apagar"
  />
</template>