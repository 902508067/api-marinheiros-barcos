<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th v-for="coluna in colunas" :key="coluna">
            {{ coluna }}
          </th>
          <th class="acoes-col">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in dados" :key="item[primaryKey]">
          <td v-for="coluna in colunas" :key="coluna">
            {{ item[coluna] }}
          </td>

          <td class="acoes">
            <button class="edit-btn" @click="$emit('editar', item)">Editar</button>
            <button class="delete-btn" @click="$emit('eliminar', item[primaryKey])">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Tabela",

  props: {
    colunas: Array,
    dados: Array,
    primaryKey: {
      type: String,
      default: "ID" // podes mudar para ID_BARCO, ID_MARINHEIRO, etc.
    }
  }
};
</script>

<style scoped>
.table-wrapper {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}

thead {
  background: #007ad9;
  color: #fff;
}

th {
  padding: 14px;
  text-align: left;
  font-weight: 600;
}

td {
  padding: 12px 14px;
  border-bottom: 1px solid #e5e7eb;
}

tr:hover td {
  background: #f3f4f6;
}

.acoes-col {
  width: 140px;
}

.acoes {
  display: flex;
  gap: 8px;
}

.edit-btn {
  background: #4da3ff;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.edit-btn:hover {
  background: #007ad9;
}

.delete-btn {
  background: #d9534f;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.delete-btn:hover {
  background: #c9302c;
}
</style>
