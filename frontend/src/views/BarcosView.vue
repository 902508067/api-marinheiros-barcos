<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Barcos</h1>

    <Loading v-if="loading" />

    <div v-else class="card shadow-2 p-3 border-round">
      <DataTable 
        :value="barcos" 
        stripedRows 
        responsiveLayout="scroll"
        paginator 
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20]"
      >
        <Column field="ID_BARCO" header="ID" />
        <Column field="NOME" header="Nome" />
        <Column field="COR" header="Cor" />

        <Column header="Ações">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-info mr-2"
              @click="abrirEditar(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
              @click="eliminar(slotProps.data.ID_BARCO)" />
          </template>
        </Column>
      </DataTable>

      <Button label="Adicionar Barco" icon="pi pi-plus" class="p-button-success mt-4"
        @click="abrirCriar" />
    </div>

    <Modal :visivel="modalAberto" :titulo="isEdit ? 'Editar Barco' : 'Criar Barco'"
      largura="35rem" @fechar="fecharModal">
      <BarcoForm :barcoInicial="barcoAtual" @guardar="guardar" @cancelar="fecharModal" />
    </Modal>

    <Mensagem ref="toast" />
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

import barcosService from "../services/barcosService";

import Modal from "../components/Modal.vue";
import BarcoForm from "../components/BarcoForm.vue";
import Mensagem from "../components/Mensagem.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "BarcosView",

  components: { DataTable, Column, Button, Modal, BarcoForm, Mensagem, Loading },

  data() {
    return {
      barcos: [],
      loading: true,
      modalAberto: false,
      isEdit: false,
      barcoAtual: null
    };
  },

  async mounted() {
    await this.carregar();
  },

  methods: {
    async carregar() {
      this.loading = true;
      this.barcos = await barcosService.getAll();
      this.loading = false;
    },

    abrirCriar() {
      this.isEdit = false;

      // FORM EM MINÚSCULAS
      this.barcoAtual = { nome: "", cor: "" };

      this.modalAberto = true;
    },

    abrirEditar(barco) {
      this.isEdit = true;

      // CONVERTER MAIÚSCULAS → minúsculas
      this.barcoAtual = {
        nome: barco.NOME,
        cor: barco.COR,
        ID_BARCO: barco.ID_BARCO
      };

      this.modalAberto = true;
    },

    fecharModal() {
      this.modalAberto = false;
    },

    async guardar(barco) {
      try {
        if (this.isEdit) {
          await barcosService.update(barco.ID_BARCO, barco);
          this.$refs.toast.sucesso("Barco atualizado!");
        } else {
          await barcosService.create(barco);
          this.$refs.toast.sucesso("Barco criado!");
        }
        this.modalAberto = false;
        await this.carregar();
      } catch {
        this.$refs.toast.erro("Erro ao guardar barco.");
      }
    },

    async eliminar(id) {
      try {
        await barcosService.delete(id);
        this.barcos = this.barcos.filter(b => b.ID_BARCO !== id);
        this.$refs.toast.sucesso("Barco eliminado!");
      } catch {
        this.$refs.toast.erro("Erro ao eliminar barco.");
      }
    }
  }
};
</script>
