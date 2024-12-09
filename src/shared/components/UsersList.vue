<script setup lang="ts">
import type { User } from '@/core/api'
import UsersListItem from '@/shared/components/UsersListItem.vue'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  users: User[]
  selected?: number | null
  view?: 'default' | 'rating'
}>()

const emit = defineEmits<{
  select: [User]
}>()

const sortedUsers = ref(props.users)

watchEffect(() => {
  if (props.view === 'rating') {
    sortedUsers.value = props.users.slice().sort((a, b) => b.rating - a.rating)
  } else {
    sortedUsers.value = props.users
  }
})
</script>

<template>
  <div class="ctr">
    <UsersListItem
      v-for="user of sortedUsers"
      :user="user"
      :key="user.id"
      :selected="user.id === selected"
      :view="view"
      @select="emit('select', $event)"
    ></UsersListItem>
  </div>
</template>

<style scoped></style>
