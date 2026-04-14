<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Barcos</h1>

    <!-- LOADING -->
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
        <Column field="ID_BARCO" header="ID" style="width: 100px"></Column>
        <Column field="NOME" header="Nome"></Column>
        <Column field="COR" header="Cor"></Column>

        <Column header="Ações" style="width: 150px">
          <template #body="slotProps">
            <Button 
              icon="pi pi-pencil" 
              class="p-button-rounded p-button-info mr-2"
              @click="abrirEditar(slotProps.data)"
            />
            <Button 
              icon="pi pi-trash" 
              class="p-button-rounded p-button-danger"
              @click="eliminarBarco(slotProps.data.ID_BARCO)"
            />
          </template>
        </Column>
      </DataTable>

      <Button 
        label="Adicionar Barco" 
        icon="pi pi-plus" 
        class="p-button-success mt-4"
        @click="abrirCriar"
      />
    </div>

    <!-- MODAL -->
    <Modal 
      :visivel="modalAberto"
      :titulo="isEdit ? 'Editar Barco' : 'Criar Barco'"
      largura="35rem"
      @fechar="fecharModal"
      @guardar="guardarBarco"
    >
      <BarcoForm 
        :barcoInicial="barcoAtual"
        @guardar="guardarBarco"
        @cancelar="fecharModal"
      />
    </Modal>

    <!-- TOAST -->
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

  components: {
    DataTable,
    Column,
    Button,
    Modal,
    BarcoForm,
    Mensagem,
    Loading
  },

  data() {
    return {
      barcos: [],
      loading: true,

      modalAberto: false,
      isEdit: false,
      barcoAtual: null
    };
  },

  async created() {
    await this.carregarBarcos();
  },

  methods: {
    async carregarBarcos() {
      this.loading = true;
      this.barcos = await barcosService.getAll();
      this.loading = false;
    },

    abrirCriar() {
      this.isEdit = false;
      this.barcoAtual = { nome: "", capacidade: 1, precoPorDia: 0, descricao: "" };
      this.modalAberto = true;
    },

    abrirEditar(barco) {
      this.isEdit = true;
      this.barcoAtual = { ...barco };
      this.modalAberto = true;
    },

    fecharModal() {
      this.modalAberto = false;
    },

    async guardarBarco(barco) {
      try {
        if (this.isEdit) {
          await barcosService.updateBarco(barco.ID_BARCO, barco);
          this.$refs.toast.sucesso("Barco atualizado com sucesso!");
        } else {
          await barcosService.createBarco(barco);
          this.$refs.toast.sucesso("Barco criado com sucesso!");
        }

        this.modalAberto = false;
        await this.carregarBarcos();

      } catch (e) {
        this.$refs.toast.erro("Ocorreu um erro ao guardar o barco.");
      }
    },

    async eliminarBarco(id) {
      try {
        await barcosService.deleteBarco(id);
        this.barcos = this.barcos.filter(b => b.ID_BARCO !== id);
        this.$refs.toast.sucesso("Barco eliminado com sucesso!");
      } catch {
        this.$refs.toast.erro("Erro ao eliminar barco.");
      }
    }
  }
};
</script>

<style scoped>
.shadow-2 {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style>
