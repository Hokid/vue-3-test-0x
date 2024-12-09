import { defineStore } from 'pinia'
import type { User } from '@/core/api/models.ts'
import type { ApiError } from '@/core/api/errors.ts'
import type { UpdateUser } from '../api'

interface UsersState {
  users: User[]
  loading: boolean
  loadingError: string | null
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
    loading: false,
    loadingError: null,
  }),
  actions: {
    async loadUsers() {
      this.loading = true
      try {
        this.users = await this.api.getUsers()
      } catch (err) {
        this.loadingError = (err as ApiError).message
      } finally {
        this.loading = false
      }
    },
    async updateUser(data: UpdateUser): Promise<void> {
      const user = await this.api.updateUser(data)
      this.$patch((state) => {
        state.users.splice(
          state.users.findIndex((user) => user.id === data.id),
          1,
          user,
        )
      })
    },
    async saveUser(id: number) {
      const user = this.users.find((user) => user.id === id)
      if (user) {
        await this.updateUser({
          id,
          rating: user.rating,
          comment: user.comment,
        })
      }
    },
  },
})
