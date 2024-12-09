<script setup lang="ts">
defineProps<{
  open: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<template>
  <div class="ctr" :class="{ open: open }">
    <slot></slot>
    <button class="toggle" @click="$emit('toggle')">
      {{ open ? '&lt;' : '&gt;' }}
    </button>
  </div>
  <div class="bg" :class="{ open: open }"></div>
</template>

<style scoped>
.bg {
  display: none;
  opacity: 0;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.73);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  transition: opacity 0.3s;
}

.ctr {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: #fff;
  transition: transform 0.5s;
  transform: translateX(-100%);
}

.ctr.open {
  transform: translateX(0);
}

.toggle {
  position: absolute;
  width: 24px;
  height: 48px;
  line-height: 48px;
  margin: 0;
  padding: 0;
  background: rgb(184 209 249);
  border: none;
  text-align: center;
  color: #20a9f3;
  top: 12px;
  right: -24px;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.toggle:hover {
  background: rgb(157, 194, 253);
}

@media (max-width: 720px) {
  .bg {
    display: block;
  }

  .bg.open {
    opacity: 1;
  }

  .ctr {
    width: calc(100% - 48px);
  }

  .toggle {
    width: 48px;
    right: -48px;
  }
}
</style>
