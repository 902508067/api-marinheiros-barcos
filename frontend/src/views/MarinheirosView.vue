<template>
  <div class="container">
    <h1>Marinheiros</h1>

    <form @submit.prevent="guardar">
      <input v-model="form.nome" placeholder="Nome" required />
      <input v-model="form.idade" type="number" placeholder="Idade" required />

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
          <th>Idade</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="m in marinheiros" :key="m.ID_MARINHEIRO || m.id_marinheiro">
          <td>{{ m.ID_MARINHEIRO || m.id_marinheiro }}</td>
          <td>{{ m.NOME || m.nome }}</td>
          <td>{{ m.IDADE || m.idade }}</td>

          <td>
            <button @click="editar(m)">Editar</button>
            <button @click="eliminar(m.ID_MARINHEIRO || m.id_marinheiro)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import marinheirosService from "../services/marinheirosService";

export default {
  data() {
    return {
      marinheiros: [],
      form: { nome: "", idade: "" },
      editId: null
    };
  },

  async mounted() {
    await this.carregar();
  },

  methods: {
    async carregar() {
      const res = await marinheirosService.getAll();
      this.marinheiros = res.data;
    },

    editar(m) {
      this.editId = m.ID_MARINHEIRO || m.id_marinheiro;
      this.form.nome = m.NOME || m.nome;
      this.form.idade = m.IDADE || m.idade;
    },

    cancelarEdicao() {
      this.editId = null;
      this.form = { nome: "", idade: "" };
    },

    async guardar() {
      if (this.editId) {
        await marinheirosService.update(this.editId, this.form);
      } else {
        await marinheirosService.create(this.form);
      }
      this.cancelarEdicao();
      await this.carregar();
    },

    async eliminar(id) {
      await marinheirosService.delete(id);
      await this.carregar();
    }
  }
};
</script>
