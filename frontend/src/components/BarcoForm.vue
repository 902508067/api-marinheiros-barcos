<template>
  <div class="p-fluid">

    <div class="field">
      <label for="nome">Nome</label>
      <InputText id="nome" v-model="form.nome" />
    </div>

    <div class="field">
      <label for="cor">Cor</label>
      <InputText id="cor" v-model="form.cor" />
    </div>

    <div class="flex justify-content-end gap-2 mt-3">
      <Button label="Cancelar" class="p-button-secondary" @click="$emit('cancelar')" />
      <Button label="Guardar" class="p-button-success" @click="guardar" />
    </div>

  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
  name: "BarcoForm",

  components: { InputText, Button },

  props: {
    barcoInicial: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      form: {
        nome: "",
        cor: ""
      }
    };
  },

  watch: {
    barcoInicial: {
      immediate: true,
      deep: true,
      handler(novo) {
        this.form = {
          nome: novo.nome || "",
          cor: novo.cor || ""
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

<style scoped>
.field {
  margin-bottom: 1rem;
}
</style>
