<template>
  <Card class="shadow-2 p-4 border-round">
    <h2 class="text-2xl font-bold mb-4">
      {{ isEdit ? "Editar Reserva" : "Criar Reserva" }}
    </h2>

    <div class="grid p-fluid">

      <!-- Barco -->
      <div class="col-12 md:col-6">
        <label class="font-bold mb-2 block">Barco</label>
        <Dropdown 
          v-model="reserva.idBarco"
          :options="barcos"
          optionLabel="nome"
          optionValue="id"
          placeholder="Selecione o barco"
          class="w-full"
        />
      </div>

      <!-- Marinheiro -->
      <div class="col-12 md:col-6">
        <label class="font-bold mb-2 block">Marinheiro</label>
        <Dropdown 
          v-model="reserva.idMarinheiro"
          :options="marinheiros"
          optionLabel="nome"
          optionValue="id"
          placeholder="Selecione o marinheiro"
          class="w-full"
        />
      </div>

      <!-- Data -->
      <div class="col-12 md:col-6">
        <label class="font-bold mb-2 block">Data da Reserva</label>
        <Calendar 
          v-model="reserva.data"
          dateFormat="dd/mm/yy"
          showIcon
          class="w-full"
        />
      </div>

      <!-- Observações -->
      <div class="col-12">
        <label class="font-bold mb-2 block">Observações</label>
        <InputTextarea 
          v-model="reserva.observacoes" 
          rows="4" 
          autoResize 
          placeholder="Notas adicionais"
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
        :label="isEdit ? 'Guardar Alterações' : 'Criar Reserva'"
        icon="pi pi-check" 
        class="p-button-success"
        @click="guardar"
      />
    </div>
  </Card>
</template>

<script>
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import InputTextarea from 'primevue/inputtextarea';
import Button from 'primevue/button';

export default {
  name: "ReservaForm",

  props: {
    reservaInicial: Object,
    barcos: Array,
    marinheiros: Array
  },

  components: {
    Card,
    Dropdown,
    Calendar,
    InputTextarea,
    Button
  },

  data() {
    return {
      reserva: { ...this.reservaInicial }
    };
  },

  computed: {
    isEdit() {
      return !!this.reserva.id;
    },
  },

  methods: {
    guardar() {
      this.$emit("guardar", this.reserva);
    },
  },
};
</script>

<style scoped>
.shadow-2 {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style>
