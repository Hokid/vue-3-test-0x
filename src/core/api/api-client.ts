import type { User } from '@/core/api/models.ts'
import axios, { type AxiosError, type AxiosInstance } from 'axios'
import type { UpdateUser } from '@/core/api/dto.ts'
import { ApiError, NotFoundError } from '@/core/api/errors.ts'
import type { ApiData, ExternalUser } from '@/core/api/internal-models.ts'
import type { Logger } from '@/core/utils/logger.ts'
import { UsersLocalStorage } from '@/core/api/users-local-storage.ts'

export class ApiClient {
  private axios: AxiosInstance
  private uLs: UsersLocalStorage

  constructor(private logger: Logger) {
    this.axios = axios.create({
      baseURL: 'https://reqres.in/',
    })
    this.uLs = new UsersLocalStorage(logger.withTag('ApiClient:UsersLocalStorage'))
    this.uLs.loadLocalUsersData()
  }

  async getUsers(): Promise<User[]> {
    try {
      const { data } = await this.axios.get<ApiData<ExternalUser[]>>('/api/users/')
      return data.data.map((user) => this.uLs.mergeWith(user))
    } catch (err) {
      this.logger.error('get users error', err)
      throw new ApiError('Api error: ' + (err as AxiosError).message)
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      const { data } = await this.axios.get<ApiData<ExternalUser>>(`/api/users/${id}`)
      return this.uLs.mergeWith(data.data)
    } catch (err) {
      if ((err as AxiosError).status === 404) {
        throw new NotFoundError(`User ${id} not found.`)
      }
      this.logger.error('get user error', err)
      throw new ApiError('Api error: ' + (err as AxiosError).message)
    }
  }

  async updateUser(data: UpdateUser): Promise<User> {
    this.uLs.patch(data)
    return this.getUser(data.id)
  }
}
