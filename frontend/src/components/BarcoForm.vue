<template>
  <Card class="shadow-2 p-4 border-round">
    <h2 class="text-2xl font-bold mb-4">
      {{ isEdit ? "Editar Barco" : "Criar Barco" }}
    </h2>

    <div class="grid p-fluid">

      <!-- Nome -->
      <div class="col-12 md:col-6">
        <label class="font-bold mb-2 block">Nome do Barco</label>
        <InputText v-model="barco.nome" placeholder="Nome do barco" />
      </div>

      <!-- Capacidade -->
      <div class="col-12 md:col-6">
        <label class="font-bold mb-2 block">Capacidade</label>
        <InputText 
          v-model.number="barco.capacidade" 
          type="number" 
          min="1" 
          placeholder="Capacidade"
        />
      </div>

      <!-- Preço -->
      <div class="col-12 md:col-6">
        <label class="font-bold mb-2 block">Preço por Dia (€)</label>
        <InputText 
          v-model.number="barco.precoPorDia" 
          type="number" 
          min="0" 
          placeholder="Preço por dia"
        />
      </div>

      <!-- Descrição -->
      <div class="col-12">
        <label class="font-bold mb-2 block">Descrição</label>
        <InputTextarea 
          v-model="barco.descricao" 
          rows="4" 
          autoResize 
          placeholder="Descrição do barco"
        />
      </div>

    </div>

    <!-- Botões -->
    <div class="mt-4 flex justify-content-end gap-3">
      <Button 
        label="Cancelar" 
        icon="pi pi-times" 
        class="p-button-secondary"
        @click="$emit('cancelar')"
      />

      <Button 
        :label="isEdit ? 'Guardar Alterações' : 'Criar Barco'"
        icon="pi pi-check" 
        class="p-button-success"
        @click="guardar"
      />
    </div>
  </Card>
</template>

<script>
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputTextarea from 'primevue/inputtextarea';
import Button from 'primevue/button';

export default {
  name: "BarcoForm",

  props: {
    barcoInicial: Object,
  },

  components: {
    Card,
    InputText,
    InputTextarea,
    Button
  },

  data() {
    return {
      barco: { ...this.barcoInicial },
    };
  },

  computed: {
    isEdit() {
      return !!this.barco.id;
    },
  },

  methods: {
    guardar() {
      this.$emit("guardar", this.barco);
    },
  },
};
</script>

<style scoped>
.shadow-2 {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style>
