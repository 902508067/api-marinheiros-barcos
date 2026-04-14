<template>
  <div class="p-fluid">

    <div class="field">
      <label for="nome">Nome</label>
      <InputText id="nome" v-model="form.nome" />
    </div>

    <div class="field">
      <label for="classificacao">Classificação</label>
      <InputNumber id="classificacao" v-model="form.classificacao" :min="0" />
    </div>

    <div class="field">
      <label for="idade">Idade</label>
      <InputNumber id="idade" v-model="form.idade" :min="18" />
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
  name: "MarinheiroForm",

  components: {
    InputText,
    InputNumber,
    Button
  },

  props: {
    marinheiroInicial: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      form: {
        nome: this.marinheiroInicial.nome || this.marinheiroInicial.NOME || "",
        classificacao: this.marinheiroInicial.classificacao || this.marinheiroInicial.CLASSIFICACAO || null,
        idade: this.marinheiroInicial.idade || this.marinheiroInicial.IDADE || null
      }
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
