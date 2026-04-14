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
        <tr v-for="r in reservas" :key="r.ID_RESERVA || r.id_reserva">
          <td>{{ r.ID_RESERVA || r.id_reserva }}</td>
          <td>{{ r.ID_BARCO || r.id_barco }}</td>
          <td>{{ r.ID_MARINHEIRO || r.id_marinheiro }}</td>
          <td>{{ formatarData(r.DATA || r.data) }}</td>

          <td>
            <button @click="editar(r)">Editar</button>
            <button @click="eliminar(r.ID_RESERVA || r.id_reserva)">Eliminar</button>
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

  methods: {
    async carregarTudo() {
      this.reservas = (await reservasService.getAll()).data;
      this.barcos = (await barcosService.getAll()).data;
      this.marinheiros = (await marinheirosService.getAll()).data;
    },

    formatarData(d) {
      return d ? d.substring(0, 10) : "";
    },

    editar(r) {
      this.editId = r.ID_RESERVA || r.id_reserva;
      this.form.id_barco = r.ID_BARCO || r.id_barco;
      this.form.id_marinheiro = r.ID_MARINHEIRO || r.id_marinheiro;
      this.form.data = this.formatarData(r.DATA || r.data);
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
