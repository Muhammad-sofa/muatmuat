import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue'
import App from './App.vue'
//import router from './router'
import store from './store'
import './styles.css';
//import 'bootstrap/dist/css/bootstrap.min.css'


createApp(App).use(store).mount('#app'); 

// const app = createApp(App)

// app.use(router)

// app.mount('#app')
