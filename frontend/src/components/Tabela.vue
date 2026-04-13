<template>
  <table border="1" cellpadding="8">
    <thead>
      <tr>
        <th v-for="col in colunas" :key="col">{{ col }}</th>
        <th>Ações</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in dados" :key="item.id">
        <td v-for="col in colunas" :key="col">{{ item[col] }}</td>
        <td>
          <button @click="$emit('editar', item)">Editar</button>
          <button @click="$emit('apagar', item.id)">Apagar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  dados: Array,
  colunas: Array
});

defineEmits(["editar", "apagar"]);
</script>
