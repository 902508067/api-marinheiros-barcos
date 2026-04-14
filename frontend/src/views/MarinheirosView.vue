<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Marinheiros</h1>

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

        <Column field="ID_MARINHEIRO" header="ID" />
        <Column field="NOME" header="Nome" />
        <Column field="CLASSIFICACAO" header="Classificação" />
        <Column field="IDADE" header="Idade" />

        <Column header="Ações">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-info mr-2"
              @click="abrirEditar(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
              @click="eliminar(slotProps.data.ID_MARINHEIRO)" />
          </template>
        </Column>
      </DataTable>

      <Button label="Adicionar Marinheiro" icon="pi pi-plus" class="p-button-success mt-4"
        @click="abrirCriar" />
    </div>

    <Modal 
      :visivel="modalAberto" 
      :titulo="isEdit ? 'Editar Marinheiro' : 'Criar Marinheiro'"
      largura="35rem" 
      @fechar="fecharModal"
    >
      <MarinheiroForm 
        :marinheiroInicial="marinheiroAtual"
        @guardar="guardar" 
        @cancelar="fecharModal" 
      />
    </Modal>

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

  components: { DataTable, Column, Button, Modal, MarinheiroForm, Mensagem, Loading },

  data() {
    return {
      marinheiros: [],
      loading: true,
      modalAberto: false,
      isEdit: false,
      marinheiroAtual: null
    };
  },

  async mounted() {
    await this.carregar();
  },

  methods: {
    async carregar() {
      this.loading = true;
      this.marinheiros = await marinheirosService.getAll();
      this.loading = false;
    },

    abrirCriar() {
      this.isEdit = false;

      // FORM EM MINÚSCULAS
      this.marinheiroAtual = { 
        nome: "", 
        classificacao: 0, 
        idade: 18 
      };

      this.modalAberto = true;
    },

    abrirEditar(marinheiro) {
      this.isEdit = true;

      // CONVERTER MAIÚSCULAS → minúsculas
      this.marinheiroAtual = {
        nome: marinheiro.NOME,
        classificacao: marinheiro.CLASSIFICACAO,
        idade: marinheiro.IDADE,
        ID_MARINHEIRO: marinheiro.ID_MARINHEIRO
      };

      this.modalAberto = true;
    },

    fecharModal() {
      this.modalAberto = false;
    },

    async guardar(marinheiro) {
      try {
        if (this.isEdit) {
          await marinheirosService.update(marinheiro.ID_MARINHEIRO, marinheiro);
          this.$refs.toast.sucesso("Marinheiro atualizado!");
        } else {
          await marinheirosService.create(marinheiro);
          this.$refs.toast.sucesso("Marinheiro criado!");
        }

        this.modalAberto = false;
        await this.carregar();

      } catch {
        this.$refs.toast.erro("Erro ao guardar marinheiro.");
      }
    },

    async eliminar(id) {
      try {
        await marinheirosService.delete(id);
        this.marinheiros = this.marinheiros.filter(m => m.ID_MARINHEIRO !== id);
        this.$refs.toast.sucesso("Marinheiro eliminado!");
      } catch {
        this.$refs.toast.erro("Erro ao eliminar marinheiro.");
      }
    }
  }
};
</script>
