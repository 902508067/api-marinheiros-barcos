<template>
  <div class="modal-overlay" @click.self="$emit('fechar')">
    <div class="modal-content">
      <h2 class="modal-title">{{ titulo }}</h2>

      <div class="modal-body">
        <slot></slot>
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" @click="$emit('fechar')">Cancelar</button>
        <button class="confirm-btn" @click="$emit('confirmar')">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    titulo: {
      type: String,
      default: "Confirmação",
    },
  },
};
</script>

<style scoped>
/* Fundo escurecido com blur */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: fadeIn 0.2s ease-out;
}

/* Janela do modal */
.modal-content {
  background: #fff;
  padding: 24px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  width: 90%;
  max-width: 420px;
  animation: slideUp 0.25s ease-out;
}

.modal-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
  color: var(--primary);
}

.modal-body {
  margin-bottom: 20px;
  color: var(--text);
  font-size: 15px;
  line-height: 1.4;
}

/* Footer com botões */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn {
  background: #e5e7eb;
  color: #000;
  padding: 10px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.cancel-btn:hover {
  background: #d1d5db;
}

.confirm-btn {
  background: var(--primary);
  color: #fff;
  padding: 10px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.confirm-btn:hover {
  background: var(--primary-light);
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
