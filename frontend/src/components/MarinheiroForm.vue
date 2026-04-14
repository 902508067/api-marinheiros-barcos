<template>
  <div class="form-container">
    <h2 class="form-title">{{ isEdit ? "Editar Marinheiro" : "Criar Marinheiro" }}</h2>

    <form @submit.prevent="guardar">
      <div class="form-group">
        <label>Nome</label>
        <input v-model="marinheiro.nome" type="text" required />
      </div>

      <div class="form-group">
        <label>Idade</label>
        <input v-model.number="marinheiro.idade" type="number" min="18" required />
      </div>

      <div class="form-group">
        <label>Anos de Experiência</label>
        <input v-model.number="marinheiro.experiencia" type="number" min="0" required />
      </div>

      <div class="form-group">
        <label>Especialidade</label>
        <input v-model="marinheiro.especialidade" type="text" required />
      </div>

      <div class="form-buttons">
        <button type="button" class="cancel-btn" @click="$emit('cancelar')">
          Cancelar
        </button>

        <button type="submit" class="save-btn">
          {{ isEdit ? "Guardar Alterações" : "Criar Marinheiro" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "MarinheiroForm",
  props: {
    marinheiroInicial: Object,
  },

  data() {
    return {
      marinheiro: { ...this.marinheiroInicial },
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
/* Container */
.form-container {
  background: #fff;
  padding: 28px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  max-width: 520px;
  margin: 0 auto;
}

.form-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 20px;
}

/* Grupos */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text);
}

input {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 15px;
  transition: 0.2s;
}

input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(0, 53, 128, 0.2);
}

/* Botões */
.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.cancel-btn {
  background: #e5e7eb;
  color: #000;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.cancel-btn:hover {
  background: #d1d5db;
}

.save-btn {
  background: var(--primary);
  color: #fff;
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.save-btn:hover {
  background: var(--primary-light);
}
</style>
