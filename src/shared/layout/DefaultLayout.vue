<script setup lang="ts">
import DefaultLayoutSidebar from '@/shared/layout/components/DefaultLayoutSidebar.vue'
import { ref, watch } from 'vue'
const sidebarOpen = ref(true)
watch(sidebarOpen, (open) => {
  if (open) {
    document.body.classList.add('overflow')
  } else {
    document.body.classList.remove('overflow')
  }
})
</script>

<template>
  <main :class="{ 'sidebar-open': sidebarOpen }">
    <DefaultLayoutSidebar :open="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen">
      <slot name="sidebar"></slot>
    </DefaultLayoutSidebar>
    <div class="content">
      <slot></slot>
    </div>
  </main>
</template>

<style scoped>
main {
  position: relative;
  transition: padding-left 0.5s;
  height: 100vh;
}

main.sidebar-open {
  padding-left: 280px;
}

.content {
  overflow: auto;
  height: 100%;
}

@media (max-width: 720px) {
  main.sidebar-open {
    padding-left: 0;
  }
}
</style>
