import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import route from './route'
import 'view-ui-plus/dist/styles/viewuiplus.css'

// localStorage.setItem('islogined', true);
createApp(App)
	.use(store)
	.use(route)
	.mount('#app')
