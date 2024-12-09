import type { User } from '@/core/api/models.ts'

export interface LocalUser {
  id: number
  rating: number
  comment?: string
}

export type ExternalUser = Omit<User, 'rating'>

export interface ApiData<D = any> {
  data: D
}
