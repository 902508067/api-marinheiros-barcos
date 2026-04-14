<template>
  <div class="p-fluid">

    <div class="field">
      <label for="barco">Barco</label>
      <InputNumber id="barco" v-model="form.id_barco" />
    </div>

    <div class="field">
      <label for="marinheiro">Marinheiro</label>
      <InputNumber id="marinheiro" v-model="form.id_marinheiro" />
    </div>

    <div class="field">
      <label for="data">Data</label>
      <InputText id="data" v-model="form.data" placeholder="YYYY-MM-DD" />
    </div>

    <div class="flex justify-content-end gap-2 mt-3">
      <Button label="Cancelar" class="p-button-secondary" @click="$emit('cancelar')" />
      <Button label="Guardar" class="p-button-success" @click="guardar" />
    </div>

  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

export default {
  name: "ReservaForm",

  components: { InputText, InputNumber, Button },

  props: {
    reservaInicial: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      form: {
        id_barco: "",
        id_marinheiro: "",
        data: ""
      }
    };
  },

  watch: {
    reservaInicial: {
      immediate: true,
      deep: true,
      handler(novo) {
        this.form = {
          id_barco: novo.id_barco || novo.ID_BARCO || "",
          id_marinheiro: novo.id_marinheiro || novo.ID_MARINHEIRO || "",
          data: novo.data || novo.DATA || ""
        };
      }
    }
  },

  methods: {
    guardar() {
      this.$emit("guardar", this.form);
    }
  }
};
</script>
