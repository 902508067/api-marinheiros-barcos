<template>
  <div class="mensagem" :class="tipo" v-if="visivel">
    <span class="icone">{{ icone }}</span>
    <span class="texto">{{ texto }}</span>
    <button class="fechar" @click="$emit('fechar')">×</button>
  </div>
</template>

<script>
export default {
  name: "Mensagem",

  props: {
    texto: String,
    tipo: {
      type: String,
      default: "info", // "sucesso", "erro", "info"
    },
    visivel: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    icone() {
      switch (this.tipo) {
        case "sucesso":
          return "✔️";
        case "erro":
          return "⚠️";
        default:
          return "ℹ️";
      }
    },
  },
};
</script>

<style scoped>
.mensagem {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 16px;
  animation: fadeIn 0.25s ease-out;
  position: relative;
}

/* Tipos */
.sucesso {
  background: #d1fae5;
  color: #065f46;
  border-left: 4px solid #10b981;
}

.erro {
  background: #fee2e2;
  color: #991b1b;
  border-left: 4px solid #ef4444;
}

.info {
  background: #dbeafe;
  color: #1e3a8a;
  border-left: 4px solid #3b82f6;
}

/* Ícone */
.icone {
  font-size: 20px;
}

/* Botão fechar */
.fechar {
  position: absolute;
  right: 12px;
  top: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: inherit;
  padding: 0;
}

.fechar:hover {
  opacity: 0.7;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
