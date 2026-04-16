import 'bootstrap/dist/css/bootstrap.min.css'
import 'primeicons/primeicons.css'
import './assets/main.css'   // must come AFTER bootstrap

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')