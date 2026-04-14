<template>
  <!-- Componente global de notificações -->
  <Toast />
</template>

<script>
export default {
  name: "Mensagem",

  methods: {
    sucesso(msg) {
      this.$toast.add({
        severity: "success",
        summary: "Sucesso",
        detail: msg,
        life: 3000
      });
    },

    erro(msg) {
      this.$toast.add({
        severity: "error",
        summary: "Erro",
        detail: msg,
        life: 4000
      });
    },

    aviso(msg) {
      this.$toast.add({
        severity: "warn",
        summary: "Aviso",
        detail: msg,
        life: 3500
      });
    },

    info(msg) {
      this.$toast.add({
        severity: "info",
        summary: "Informação",
        detail: msg,
        life: 3000
      });
    }
  }
};
</script>

<style scoped>
/* Nada necessário — o PrimeVue trata do design */
</style>
