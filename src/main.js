import { createApp } from 'vue'
import App from './App.vue'
import route from './route'
import 'view-ui-plus/dist/styles/viewuiplus.css'

createApp(App).use(route).mount('#app')
