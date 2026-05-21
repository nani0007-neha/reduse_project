import 'bootstrap/dist/css/bootstrap.min.css'
import 'primeicons/primeicons.css'
import './assets/main.css'   // must come AFTER bootstrap

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false,
        },
    },
})
app.use(router)
app.use(VueApexCharts)
app.mount('#app')