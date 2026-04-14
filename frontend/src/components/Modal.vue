<template>
  <Dialog 
    :visible="visivel" 
    :modal="true" 
    :closable="false"
    :style="{ width: largura }"
    @hide="$emit('fechar')"
  >
    <!-- Cabeçalho -->
    <template #header>
      <h2 class="text-xl font-bold m-0">{{ titulo }}</h2>
    </template>

    <!-- CONTEÚDO CORRETO -->
    <template #default>
      <div class="mt-2">
        <slot />
      </div>
    </template>

  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';

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
    Dialog
  }
};
</script>
