<template>
  <div class="p-fluid">

    <div class="field">
      <label for="barco">Barco</label>
      <Dropdown 
        id="barco"
        v-model="form.ID_BARCO"
        :options="barcos"
        optionLabel="NOME"
        optionValue="ID_BARCO"
        placeholder="Selecione um barco"
      />
    </div>

    <div class="field">
      <label for="marinheiro">Marinheiro</label>
      <Dropdown 
        id="marinheiro"
        v-model="form.ID_MARINHEIRO"
        :options="marinheiros"
        optionLabel="NOME"
        optionValue="ID_MARINHEIRO"
        placeholder="Selecione um marinheiro"
      />
    </div>

    <div class="field">
      <label for="data">Data</label>
      <Calendar id="data" v-model="form.DATA" dateFormat="dd/mm/yy" />
    </div>

    <div class="flex justify-content-end gap-2 mt-3">
      <Button label="Cancelar" class="p-button-secondary" @click="$emit('cancelar')" />
      <Button label="Guardar" class="p-button-success" @click="guardar" />
    </div>

  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';

export default {
  name: "ReservaForm",

  components: {
    Dropdown,
    Calendar,
    Button
  },

  props: {
    reservaInicial: {
      type: Object,
      required: true
    },
    barcos: {
      type: Array,
      required: true
    },
    marinheiros: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      form: { ...this.reservaInicial }
    };
  },

  methods: {
    guardar() {
      this.$emit("guardar", this.form);
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}
</style>
