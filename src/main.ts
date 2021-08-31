import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/vue3/scss/index.scss'

const app = createApp(App)

app.use(router)
app.mount('#app')
