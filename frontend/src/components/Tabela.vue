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
        <tr v-for="item in dados" :key="item.id">
          <td v-for="coluna in colunas" :key="coluna">
            {{ item[coluna.toLowerCase()] }}
          </td>

          <td class="acoes">
            <button class="edit-btn" @click="$emit('editar', item)">Editar</button>
            <button class="delete-btn" @click="$emit('eliminar', item.id)">Eliminar</button>
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
  },
};
</script>

<style scoped>
.table-wrapper {
  background: #fff;
  padding: 20px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow-x: auto;
}

/* Tabela moderna estilo Booking */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}

thead {
  background: var(--primary);
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
  color: var(--text);
}

tr:hover td {
  background: #f3f4f6;
}

/* Coluna das ações */
.acoes-col {
  width: 140px;
}

.acoes {
  display: flex;
  gap: 8px;
}

/* Botões */
.edit-btn {
  background: var(--primary-light);
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.edit-btn:hover {
  background: var(--primary);
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
