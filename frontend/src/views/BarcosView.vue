<template>
  <div class="container">
    <h1>Barcos</h1>

    <form @submit.prevent="guardar">
      <input v-model="form.nome" placeholder="Nome" required />
      <input v-model="form.cor" placeholder="Cor" required />

      <button type="submit">
        {{ editId ? "Atualizar" : "Criar" }}
      </button>
      <button v-if="editId" @click="cancelarEdicao" type="button">Cancelar</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Cor</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="b in barcos" :key="b.ID_BARCO || b.id_barco">
          <td>{{ b.ID_BARCO || b.id_barco }}</td>
          <td>{{ b.NOME || b.nome }}</td>
          <td>{{ b.COR || b.cor }}</td>

          <td>
            <button @click="editar(b)">Editar</button>
            <button @click="eliminar(b.ID_BARCO || b.id_barco)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import barcosService from "../services/barcosService";

export default {
  data() {
    return {
      barcos: [],
      form: { nome: "", cor: "" },
      editId: null
    };
  },

  async mounted() {
    await this.carregar();
  },

  methods: {
    async carregar() {
      const res = await barcosService.getAll();
      this.barcos = res.data;
    },

    editar(b) {
      this.editId = b.ID_BARCO || b.id_barco;
      this.form.nome = b.NOME || b.nome;
      this.form.cor = b.COR || b.cor;
    },

    cancelarEdicao() {
      this.editId = null;
      this.form = { nome: "", cor: "" };
    },

    async guardar() {
      if (this.editId) {
        await barcosService.update(this.editId, this.form);
      } else {
        await barcosService.create(this.form);
      }
      this.cancelarEdicao();
      await this.carregar();
    },

    async eliminar(id) {
      await barcosService.delete(id);
      await this.carregar();
    }
  }
};
</script>
