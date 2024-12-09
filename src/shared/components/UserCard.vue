<script setup lang="ts">
import type { User } from '@/core/api'
import { computed } from 'vue'

const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  rating: [number]
  comment: [string]
  save: []
}>()

const name = computed(() => `${props.user.first_name} ${props.user.last_name}`)

function downRating() {
  emit('rating', Math.max(0, props.user.rating - 1))
}

function upRating() {
  emit('rating', Math.min(10, props.user.rating + 1))
}
</script>

<template>
  <div class="card">
    <div class="content">
      <div>
        <div class="avatar">
          <img :src="user.avatar" :alt="name" />
        </div>
      </div>
      <div>
        <h3 class="name">{{ name }}</h3>
        <p class="email">{{ user.email }}</p>
        <div class="rating">
          <button @click="downRating">&lt;</button>
          <span>{{ user.rating }} point{{ user.rating > 1 ? 's' : '' }}</span>
          <button @click="upRating">&gt;</button>
        </div>
        <textarea
          class="comment"
          :value="user.comment"
          @change="emit('comment', $event.target!.value)"
        >
        </textarea>
      </div>
    </div>
    <div class="actions">
      <button class="btn" @click="emit('save')">Save</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 15px;
  padding: 12px 24px;
}

.content {
  display: flex;
}

.content > div:first-child {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 24px;
}

.content > div:last-child {
  flex-grow: 2;
}

.avatar {
  overflow: hidden;
  border-radius: 15px;
  width: 100px;
  height: 100px;
}

.avatar > img {
  width: 100%;
  height: 100%;
}

.name {
  margin: 0;
}

.email {
  margin: 0;
}

.rating {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
}

.comment {
  width: 100% !important;
  margin-top: 24px;
}

.actions {
  margin-top: 12px;
  text-align: center;
}
</style>
