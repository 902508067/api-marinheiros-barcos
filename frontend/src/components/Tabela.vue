<script setup>
defineProps({
  dados: Array,
  colunas: Array
});

defineEmits(['delete']);
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
      <tr v-for="item in dados" :key="item.id_reserva">
        <td v-for="col in colunas" :key="col.key">
          {{ item[col.key] }}
        </td>
        <td>
          <button @click="$emit('edit', item)">Editar</button>
          <button @click="$emit('delete', item.id_reserva)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
