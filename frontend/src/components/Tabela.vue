<script setup>
const props = defineProps({
  dados: Array,
  colunas: Array
});

const emit = defineEmits(['delete', 'edit']);

// Descobre automaticamente qual é a coluna ID
const getIdKey = () => {
  const idCol = props.colunas.find(c =>
    c.key.toUpperCase().includes('ID')
  );
  return idCol ? idCol.key : null;
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in colunas" :key="col.key">{{ col.label }}</th>
        <th>Ações</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in dados" :key="item[getIdKey()]">
        <td v-for="col in colunas" :key="col.key">
          {{ item[col.key] }}
        </td>

        <td>
          <button @click="emit('edit', item)">Editar</button>
          <button @click="emit('delete', item[getIdKey()])">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
}

th {
  background: #f3f4f6;
  text-align: left;
}

button {
  margin-right: 8px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
