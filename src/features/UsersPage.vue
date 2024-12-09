<script setup lang="ts">
import DefaultLayout from '@/shared/layout/DefaultLayout.vue'
import UserCart from '@/shared/components/UserCard.vue'
import { useUsersStore } from '@/core/stores/users.ts'
import { inject, onMounted, ref, watch } from 'vue'
import type { User } from '@/core/api'
import Tabs from '@/shared/components/Tabs.vue'
import Search from '@/shared/components/Search.vue'
import UsersList from '@/shared/components/UsersList.vue'
import { type Logger, LOGGER } from '@/core/utils/logger.ts'

const usersStore = useUsersStore()
const logger = inject<Logger>(LOGGER)!.withTag('UsersPage')

onMounted(() => {
  usersStore.loadUsers().catch((err) => {
    logger.error('users loading', err)
    alert('Failed to get clients list.')
  })
})

// Selected user
const selectedUserId = ref<number | null>(null)
const selectedUser = ref<User | null>(null)

watch(selectedUserId, (next, prev) => {
  if (prev !== next) {
    if (!next) {
      selectedUser.value = null
      return
    }
    const found = usersStore.users.find((u) => u.id === selectedUserId.value)
    if (found) {
      selectedUser.value = {
        ...found,
      }
    }
  }
})

function saveUser() {
  if (selectedUser.value) {
    usersStore
      .updateUser({
        id: selectedUser.value.id,
        rating: selectedUser.value.rating,
        comment: selectedUser.value.comment,
      })
      .catch((err) => {
        logger.error('safe user', {
          user: selectedUser.value,
          err,
        })
        alert('Failed to save data.')
      })
  }
}

// Users search
const usersSearch = ref('')
const filteredUsers = ref<User[]>([])

function updateFilteredUsers() {
  filteredUsers.value = usersStore.users.filter((user): user is User =>
    [user.first_name, user.last_name]
      .join(' ')
      .toLowerCase()
      .includes(usersSearch.value.toLowerCase()),
  )
}

watch(
  () => usersStore.users,
  () => updateFilteredUsers(),
  { deep: true },
)

// Selected tab
const selectedTab = ref('Clients')
</script>

<template>
  <DefaultLayout>
    <template #sidebar>
      <div class="sidebar-ctr">
        <div class="sidebar-header">
          <Tabs
            :tabs="['Clients', 'Rating']"
            :selected="selectedTab"
            @select="selectedTab = $event"
          ></Tabs>
          <Search class="users-search" v-model="usersSearch" @search="updateFilteredUsers"></Search>
        </div>
        <div class="sidebar-content">
          <UsersList
            :users="filteredUsers"
            :selected="selectedUserId"
            :view="selectedTab === 'Rating' ? 'rating' : 'default'"
            @select="selectedUserId = $event.id"
          ></UsersList>
        </div>
        <div class="sidebar-actions"></div>
      </div>
    </template>
    <div class="card-ctr">
      <UserCart
        v-if="selectedUser"
        class="user-card"
        :user="selectedUser"
        @rating="selectedUser.rating = $event"
        @comment="selectedUser.comment = $event"
        @save="saveUser"
      />
      <p v-else>Select user</p>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.card-ctr {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-card {
  width: 560px;
}

.sidebar-header {
  background: rgb(184 209 249);
  padding: 12px 24px;
}

.users-search {
  margin-top: 12px;
}
</style>
