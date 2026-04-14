<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Marinheiros</h1>

    <!-- LOADING -->
    <Loading v-if="loading" />

    <div v-else class="card shadow-2 p-3 border-round">
      <DataTable 
        :value="marinheiros" 
        stripedRows 
        responsiveLayout="scroll"
        paginator 
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20]"
      >
        <Column field="ID_MARINHEIRO" header="ID" style="width: 100px"></Column>
        <Column field="NOME" header="Nome"></Column>
        <Column field="FUNCAO" header="Função"></Column>
        <Column field="IDADE" header="Idade"></Column>

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
              @click="eliminarMarinheiro(slotProps.data.ID_MARINHEIRO)"
            />
          </template>
        </Column>
      </DataTable>

      <Button 
        label="Adicionar Marinheiro" 
        icon="pi pi-plus" 
        class="p-button-success mt-4"
        @click="abrirCriar"
      />
    </div>

    <!-- MODAL -->
    <Modal 
      :visivel="modalAberto"
      :titulo="isEdit ? 'Editar Marinheiro' : 'Criar Marinheiro'"
      largura="35rem"
      @fechar="fecharModal"
      @guardar="guardarMarinheiro"
    >
      <MarinheiroForm 
        :marinheiroInicial="marinheiroAtual"
        @guardar="guardarMarinheiro"
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

import marinheirosService from "../services/marinheirosService";

import Modal from "../components/Modal.vue";
import MarinheiroForm from "../components/MarinheiroForm.vue";
import Mensagem from "../components/Mensagem.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "MarinheirosView",

  components: {
    DataTable,
    Column,
    Button,
    Modal,
    MarinheiroForm,
    Mensagem,
    Loading
  },

  data() {
    return {
      marinheiros: [],
      loading: true,

      modalAberto: false,
      isEdit: false,
      marinheiroAtual: null
    };
  },

  async created() {
    await this.carregarMarinheiros();
  },

  methods: {
    async carregarMarinheiros() {
      this.loading = true;
      this.marinheiros = await marinheirosService.getAll();
      this.loading = false;
    },

    abrirCriar() {
      this.isEdit = false;
      this.marinheiroAtual = { nome: "", idade: 18, funcao: "", descricao: "" };
      this.modalAberto = true;
    },

    abrirEditar(marinheiro) {
      this.isEdit = true;
      this.marinheiroAtual = { ...marinheiro };
      this.modalAberto = true;
    },

    fecharModal() {
      this.modalAberto = false;
    },

    async guardarMarinheiro(marinheiro) {
      try {
        if (this.isEdit) {
          await marinheirosService.updateMarinheiro(marinheiro.ID_MARINHEIRO, marinheiro);
          this.$refs.toast.sucesso("Marinheiro atualizado com sucesso!");
        } else {
          await marinheirosService.createMarinheiro(marinheiro);
          this.$refs.toast.sucesso("Marinheiro criado com sucesso!");
        }

        this.modalAberto = false;
        await this.carregarMarinheiros();

      } catch (e) {
        this.$refs.toast.erro("Ocorreu um erro ao guardar o marinheiro.");
      }
    },

    async eliminarMarinheiro(id) {
      try {
        await marinheirosService.deleteMarinheiro(id);
        this.marinheiros = this.marinheiros.filter(m => m.ID_MARINHEIRO !== id);
        this.$refs.toast.sucesso("Marinheiro eliminado com sucesso!");
      } catch {
        this.$refs.toast.erro("Erro ao eliminar marinheiro.");
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
