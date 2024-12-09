<script setup lang="ts">
defineProps<{
  tabs: string[]
  selected?: string
}>()

const emit = defineEmits<{
  select: [string]
}>()
</script>

<template>
  <div class="tabs">
    <button
      class="btn"
      v-for="tab of tabs"
      @click="emit('select', tab)"
      :key="tab"
      :disabled="selected === tab"
    >
      {{ tab }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  align-items: center;
}

.tabs > button {
  flex-grow: 1;
}

.tabs > button + button {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.tabs > button:first-child:not(:only-child) {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
</style>
