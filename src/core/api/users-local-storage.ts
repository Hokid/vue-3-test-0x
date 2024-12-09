import type { ExternalUser, LocalUser } from '@/core/api/internal-models.ts'
import type { User } from '@/core/api/models.ts'
import type { Logger } from '@/core/utils/logger.ts'

export type LocalUsersData = Record<string, LocalUser>

export class UsersLocalStorage {
  private static LS_USERS_KEY = 'users'
  private localStorage = window.localStorage
  private localUsersData: LocalUsersData = {}

  constructor(private logger: Logger) {}

  patch(data: LocalUser) {
    this.localUsersData[data.id] = {
      ...this.localUsersData[data.id],
      ...data,
    }
    this.saveLocalUsersData()
  }

  mergeWith(user: ExternalUser): User {
    let localUser: LocalUser | undefined = this.localUsersData[user.id]
    if (!localUser) {
      localUser = {
        id: user.id,
        rating: 0,
      }
      this.localUsersData[user.id] = localUser
    }
    return {
      ...user,
      ...localUser,
    }
  }

  saveLocalUsersData() {
    try {
      this.localStorage.setItem(UsersLocalStorage.LS_USERS_KEY, JSON.stringify(this.localUsersData))
    } catch (err) {
      this.logger.error('failed to save local users data', err)
    }
  }

  loadLocalUsersData(): LocalUsersData {
    try {
      const data = this.localStorage.getItem(UsersLocalStorage.LS_USERS_KEY)
      if (data) {
        this.localUsersData = JSON.parse(data)
      }
    } catch (err) {
      this.logger.error('failed to load local users data', err)
    }
    return {}
  }
}
