<template>
  <div class="container">
    <h1>Reservas</h1>

    <form @submit.prevent="guardar">
      <select v-model="form.id_barco" required>
        <option disabled value="">Selecione um barco</option>
        <option v-for="b in barcos" :key="b.id_barco" :value="b.id_barco">
          {{ b.nome }}
        </option>
      </select>

      <select v-model="form.id_marinheiro" required>
        <option disabled value="">Selecione um marinheiro</option>
        <option v-for="m in marinheiros" :key="m.id_marinheiro" :value="m.id_marinheiro">
          {{ m.nome }}
        </option>
      </select>

      <input type="date" v-model="form.data" required />

      <button type="submit">
        {{ editId ? "Atualizar" : "Criar" }}
      </button>
      <button v-if="editId" @click="cancelarEdicao" type="button">Cancelar</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Barco</th>
          <th>Marinheiro</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="r in reservasOrdenadas" :key="r.id_reserva">
          <td>{{ r.id_reserva }}</td>
          <td>{{ nomeBarco(r.id_barco) }}</td>
          <td>{{ nomeMarinheiro(r.id_marinheiro) }}</td>
          <td>{{ r.data.substring(0, 10) }}</td>

          <td>
            <button @click="editar(r)">Editar</button>
            <button @click="eliminar(r.id_reserva)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import reservasService from "../services/reservasService";
import barcosService from "../services/barcosService";
import marinheirosService from "../services/marinheirosService";

export default {
  data() {
    return {
      reservas: [],
      barcos: [],
      marinheiros: [],
      form: { id_barco: "", id_marinheiro: "", data: "" },
      editId: null
    };
  },

  async mounted() {
    await this.carregarTudo();
  },

  computed: {
    reservasOrdenadas() {
      return [...this.reservas].sort((a, b) => a.data.localeCompare(b.data));
    }
  },

  methods: {
    normalizar(obj) {
      const novo = {};
      for (const k in obj) novo[k.toLowerCase()] = obj[k];
      return novo;
    },

    async carregarTudo() {
      this.reservas = (await reservasService.getAll()).data.map(r => this.normalizar(r));
      this.barcos = (await barcosService.getAll()).data.map(b => this.normalizar(b));
      this.marinheiros = (await marinheirosService.getAll()).data.map(m => this.normalizar(m));
    },

    nomeBarco(id) {
      const b = this.barcos.find(x => x.id_barco == id);
      return b ? b.nome : "—";
    },

    nomeMarinheiro(id) {
      const m = this.marinheiros.find(x => x.id_marinheiro == id);
      return m ? m.nome : "—";
    },

    editar(r) {
      this.editId = r.id_reserva;
      this.form.id_barco = r.id_barco;
      this.form.id_marinheiro = r.id_marinheiro;
      this.form.data = r.data.substring(0, 10);
    },

    cancelarEdicao() {
      this.editId = null;
      this.form = { id_barco: "", id_marinheiro: "", data: "" };
    },

    async guardar() {
      if (this.editId) {
        await reservasService.update(this.editId, this.form);
      } else {
        await reservasService.create(this.form);
      }
      this.cancelarEdicao();
      await this.carregarTudo();
    },

    async eliminar(id) {
      await reservasService.delete(id);
      await this.carregarTudo();
    }
  }
};
</script>
