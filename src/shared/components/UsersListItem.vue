<script setup lang="ts">
import type { User } from '@/core/api'
import { computed } from 'vue'

const props = defineProps<{
  user: User
  selected?: boolean
  view?: 'default' | 'rating'
}>()

const emit = defineEmits<{
  select: [User]
}>()

const name = computed(() => `${props.user.first_name} ${props.user.last_name}`)
</script>

<template>
  <a class="ctr" :class="{ selected }" @click="emit('select', user)">
    <div class="avatar">
      <img v-show="!view || view === 'default'" :src="user.avatar" :alt="name" />
      <span v-show="view === 'rating'">{{ user.rating }}</span>
    </div>
    <p>{{ name }}</p>
    <button>></button>
  </a>
</template>

<style scoped>
.ctr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  cursor: pointer;
}

.ctr:hover,
.ctr.selected {
  background: #b3bcdd;
}

.ctr > button {
  pointer-events: none;
}

.avatar {
  width: 50px;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  border-radius: 5px;
  text-align: center;
}

.avatar > img {
  width: 100%;
  height: 100%;
  vertical-align: top;
}

.avatar > span {
  font-size: 24px;
}
</style>
