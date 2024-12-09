import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './route.ts'
import { createPinia } from 'pinia'
import { ApiClient } from '@/core/api/api-client.ts'
import { API_CLIENT } from '@/core/api'
import { LOGGER, mainLogger } from '@/core/utils/logger.ts'

const pinia = createPinia()
const app = createApp(App)
const api = new ApiClient(mainLogger.withTag('ApiClient'))

declare module 'pinia' {
  export interface PiniaCustomProperties {
    api: ApiClient
  }
}

pinia.use(() => ({
  api: api,
}))
app.use(router)
app.use(pinia)
app.provide(API_CLIENT, api)
app.provide(LOGGER, mainLogger)

app.mount('#app')
