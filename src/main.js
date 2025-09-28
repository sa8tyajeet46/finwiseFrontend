import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'primeicons/primeicons.css'

import App from './App.vue'
import './index.css'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
// Use the plugin
pinia.use(piniaPluginPersistedstate)

app.use(createPinia())

app.use(pinia)

app.use(router)

app.mount('#app')
