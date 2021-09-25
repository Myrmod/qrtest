import { createApp } from 'vue'
import App from './App.vue'
import config from '@/config'
import router from '@/router'

const app = createApp(App)

app.use(config).use(router).mount('#app')
