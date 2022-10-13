import { createApp } from 'vue'
import App from './App.vue'
import './assets/style/main.scss'
import showNotif from '@/utils/notif.plugin'


const app = createApp(App)

app.use(showNotif)

app.mount('#app')