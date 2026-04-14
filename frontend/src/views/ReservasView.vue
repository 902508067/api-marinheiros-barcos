<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Reservas</h1>

    <!-- LOADING -->
    <Loading v-if="loading" />

    <div v-else class="card shadow-2 p-3 border-round">
      <DataTable 
        :value="reservas" 
        stripedRows 
        responsiveLayout="scroll"
        paginator 
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20]"
      >
        <Column field="ID_RESERVA" header="ID" style="width: 100px"></Column>
        <Column field="NOME_BARCO" header="Barco"></Column>
        <Column field="NOME_MARINHEIRO" header="Marinheiro"></Column>
        <Column field="DATA" header="Data"></Column>

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
              @click="eliminarReserva(slotProps.data.ID_RESERVA)"
            />
          </template>
        </Column>
      </DataTable>

      <Button 
        label="Adicionar Reserva" 
        icon="pi pi-plus" 
        class="p-button-success mt-4"
        @click="abrirCriar"
      />
    </div>

    <!-- MODAL -->
    <Modal 
      :visivel="modalAberto"
      :titulo="isEdit ? 'Editar Reserva' : 'Criar Reserva'"
      largura="35rem"
      @fechar="fecharModal"
      @guardar="guardarReserva"
    >
      <ReservaForm 
        :reservaInicial="reservaAtual"
        :barcos="barcos"
        :marinheiros="marinheiros"
        @guardar="guardarReserva"
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

import reservasService from "../services/reservasService";
import barcosService from "../services/barcosService";
import marinheirosService from "../services/marinheirosService";

import Modal from "../components/Modal.vue";
import ReservaForm from "../components/ReservaForm.vue";
import Mensagem from "../components/Mensagem.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "ReservasView",

  components: {
    DataTable,
    Column,
    Button,
    Modal,
    ReservaForm,
    Mensagem,
    Loading
  },

  data() {
    return {
      reservas: [],
      barcos: [],
      marinheiros: [],
      loading: true,

      modalAberto: false,
      isEdit: false,
      reservaAtual: null
    };
  },

  async created() {
    await this.carregarTudo();
  },

  methods: {
    async carregarTudo() {
      this.loading = true;

      this.reservas = await reservasService.getAll();
      this.barcos = await barcosService.getAll();
      this.marinheiros = await marinheirosService.getAll();

      this.loading = false;
    },

    abrirCriar() {
      this.isEdit = false;
      this.reservaAtual = { idBarco: null, idMarinheiro: null, data: null, observacoes: "" };
      this.modalAberto = true;
    },

    abrirEditar(reserva) {
      this.isEdit = true;
      this.reservaAtual = { ...reserva };
      this.modalAberto = true;
    },

    fecharModal() {
      this.modalAberto = false;
    },

    async guardarReserva(reserva) {
      try {
        if (this.isEdit) {
          await reservasService.updateReserva(reserva.ID_RESERVA, reserva);
          this.$refs.toast.sucesso("Reserva atualizada com sucesso!");
        } else {
          await reservasService.createReserva(reserva);
          this.$refs.toast.sucesso("Reserva criada com sucesso!");
        }

        this.modalAberto = false;
        await this.carregarTudo();

      } catch (e) {
        this.$refs.toast.erro("Ocorreu um erro ao guardar a reserva.");
      }
    },

    async eliminarReserva(id) {
      try {
        await reservasService.deleteReserva(id);
        this.reservas = this.reservas.filter(r => r.ID_RESERVA !== id);
        this.$refs.toast.sucesso("Reserva eliminada com sucesso!");
      } catch {
        this.$refs.toast.erro("Erro ao eliminar reserva.");
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
