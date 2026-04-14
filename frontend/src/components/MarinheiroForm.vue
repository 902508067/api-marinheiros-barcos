<template>
  <Card class="shadow-2 p-4 border-round">
    <h2 class="text-2xl font-bold mb-4">
      {{ isEdit ? "Editar Marinheiro" : "Criar Marinheiro" }}
    </h2>

    <div class="grid p-fluid">

      <!-- Nome -->
      <div class="col-12 md:col-6">
        <label class="font-bold mb-2 block">Nome</label>
        <InputText v-model="marinheiro.nome" placeholder="Nome do marinheiro" />
      </div>

      <!-- Idade -->
      <div class="col-12 md:col-6">
        <label class="font-bold mb-2 block">Idade</label>
        <InputNumber 
          v-model="marinheiro.idade" 
          :min="18" 
          :max="80"
          placeholder="Idade"
          inputClass="w-full"
        />
      </div>

      <!-- Função -->
      <div class="col-12 md:col-6">
        <label class="font-bold mb-2 block">Função</label>
        <Dropdown 
          v-model="marinheiro.funcao"
          :options="funcoes"
          placeholder="Selecione a função"
          class="w-full"
        />
      </div>

      <!-- Descrição -->
      <div class="col-12">
        <label class="font-bold mb-2 block">Descrição</label>
        <InputTextarea 
          v-model="marinheiro.descricao" 
          rows="4" 
          autoResize 
          placeholder="Descrição do marinheiro"
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
        :label="isEdit ? 'Guardar Alterações' : 'Criar Marinheiro'"
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
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

export default {
  name: "MarinheiroForm",

  props: {
    marinheiroInicial: Object,
  },

  components: {
    Card,
    InputText,
    InputTextarea,
    InputNumber,
    Dropdown,
    Button
  },

  data() {
    return {
      marinheiro: { ...this.marinheiroInicial },

      funcoes: [
        "Capitão",
        "Imediato",
        "Marinheiro de Convés",
        "Mecânico Naval",
        "Técnico de Navegação"
      ]
    };
  },

  computed: {
    isEdit() {
      return !!this.marinheiro.id;
    },
  },

  methods: {
    guardar() {
      this.$emit("guardar", this.marinheiro);
    },
  },
};
</script>

<style scoped>
.shadow-2 {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style>
