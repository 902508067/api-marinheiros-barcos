<template>
  <div class="form-container">
    <h2 class="form-title">{{ isEdit ? "Editar Reserva" : "Criar Reserva" }}</h2>

    <form @submit.prevent="guardar">
      <!-- Seleção do Barco -->
      <div class="form-group">
        <label>Barco</label>
        <select v-model="reserva.barcoId" required>
          <option disabled value="">Selecione um barco</option>
          <option v-for="barco in barcos" :key="barco.id" :value="barco.id">
            {{ barco.nome }} — €{{ barco.precoPorDia }}/dia
          </option>
        </select>
      </div>

      <!-- Seleção do Marinheiro -->
      <div class="form-group">
        <label>Marinheiro</label>
        <select v-model="reserva.marinheiroId" required>
          <option disabled value="">Selecione um marinheiro</option>
          <option v-for="m in marinheiros" :key="m.id" :value="m.id">
            {{ m.nome }} ({{ m.experiencia }} anos exp.)
          </option>
        </select>
      </div>

      <!-- Datas -->
      <div class="form-group">
        <label>Data de Início</label>
        <input v-model="reserva.dataInicio" type="date" required />
      </div>

      <div class="form-group">
        <label>Data de Fim</label>
        <input v-model="reserva.dataFim" type="date" required />
      </div>

      <!-- Preço total -->
      <div class="form-group">
        <label>Preço Total (€)</label>
        <input v-model.number="reserva.precoTotal" type="number" min="0" required />
      </div>

      <!-- Botões -->
      <div class="form-buttons">
        <button type="button" class="cancel-btn" @click="$emit('cancelar')">
          Cancelar
        </button>

        <button type="submit" class="save-btn">
          {{ isEdit ? "Guardar Alterações" : "Criar Reserva" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import barcosService from "../services/barcosService";
import marinheirosService from "../services/marinheirosService";

export default {
  name: "ReservaForm",

  props: {
    reservaInicial: Object,
  },

  data() {
    return {
      reserva: { ...this.reservaInicial },
      barcos: [],
      marinheiros: [],
    };
  },

  computed: {
    isEdit() {
      return !!this.reserva.id;
    },
  },

  async created() {
    this.barcos = await barcosService.getAll();
    this.marinheiros = await marinheirosService.getAll();
  },

  methods: {
    guardar() {
      this.$emit("guardar", this.reserva);
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

input,
select {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 15px;
  transition: 0.2s;
}

input:focus,
select:focus {
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
