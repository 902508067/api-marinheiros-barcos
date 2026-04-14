<template>
  <Dialog 
    :visible="visivel" 
    :modal="true" 
    :closable="false"
    :style="{ width: largura }"
    @hide="$emit('fechar')"
  >
    <!-- Título -->
    <template #header>
      <h2 class="text-xl font-bold m-0">{{ titulo }}</h2>
    </template>

    <!-- Conteúdo -->
    <div class="mt-2">
      <slot />
    </div>

    <!-- Rodapé -->
    <template #footer>
      <div class="flex justify-content-end gap-3">
        <Button 
          label="Cancelar" 
          icon="pi pi-times" 
          class="p-button-secondary"
          @click="$emit('fechar')"
        />

        <Button 
          label="Guardar" 
          icon="pi pi-check" 
          class="p-button-success"
          @click="$emit('guardar')"
        />
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

export default {
  name: "Modal",

  props: {
    visivel: Boolean,
    titulo: String,
    largura: {
      type: String,
      default: "40rem"
    }
  },

  components: {
    Dialog,
    Button
  }
};
</script>

<style scoped>
/* Nada de CSS manual — o PrimeVue já trata do design */
</style>
