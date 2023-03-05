import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// import './assets/main.css'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:8080'
app.use(router)
app.config.globalProperties.$axios = axios;

app.mount('#app')
