import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initApexCharts } from './plugins/apexcharts'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
initApexCharts(app);

app.mount('#app')
