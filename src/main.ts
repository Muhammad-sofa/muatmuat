import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Import store

createApp(App)
  .use(store) // Gunakan store
  .mount('#app');
