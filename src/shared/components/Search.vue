<script setup lang="ts">
const input = defineModel()
const emit = defineEmits<{
  search: []
}>()
</script>

<template>
  <div class="ctr">
    <input type="text" v-model="input" />
    <button @click="emit('search')">Search</button>
  </div>
</template>

<style scoped>
.ctr {
  display: flex;
}

.ctr > input {
  width: 0;
  flex-grow: 1;
}
</style>
