<template>
  <div class="p-fluid">

    <div class="field">
      <label for="barco">Barco</label>
      <Dropdown 
        id="barco"
        v-model="form.id_barco"
        :options="barcos"
        optionLabel="nome"
        optionValue="id_barco"
        placeholder="Selecione um barco"
      />
    </div>

    <div class="field">
      <label for="marinheiro">Marinheiro</label>
      <Dropdown 
        id="marinheiro"
        v-model="form.id_marinheiro"
        :options="marinheiros"
        optionLabel="nome"
        optionValue="id_marinheiro"
        placeholder="Selecione um marinheiro"
      />
    </div>

    <div class="field">
      <label for="data">Data</label>
      <Calendar id="data" v-model="form.data" dateFormat="dd/mm/yy" />
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
      form: {
        // aceita minúsculas OU maiúsculas
        id_barco: this.reservaInicial.id_barco || this.reservaInicial.ID_BARCO || null,
        id_marinheiro: this.reservaInicial.id_marinheiro || this.reservaInicial.ID_MARINHEIRO || null,

        // aceita data em minúsculas OU maiúsculas
        data: this.reservaInicial.data
          ? new Date(this.reservaInicial.data)
          : this.reservaInicial.DATA
          ? new Date(this.reservaInicial.DATA)
          : null
      }
    };
  },

  methods: {
    guardar() {
      let payload = {
        id_barco: this.form.id_barco,
        id_marinheiro: this.form.id_marinheiro,
        data: this.formatarData(this.form.data)
      };

      this.$emit("guardar", payload);
    },

    formatarData(dateObj) {
      if (!dateObj) return null;

      const ano = dateObj.getFullYear();
      const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
      const dia = String(dateObj.getDate()).padStart(2, "0");

      return `${ano}-${mes}-${dia}`;
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}
</style>
