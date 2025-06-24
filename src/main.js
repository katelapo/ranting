// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { authStore } from './stores/auth.js'; // Mengimpor authStore

// Placeholder untuk variabel global dari lingkungan Canvas (tidak digunakan dalam demo ini)
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Buat instance aplikasi Vue
const app = createApp(App);

// Gunakan router
app.use(router);

// Sediakan authStore secara global agar bisa diakses oleh komponen
app.config.globalProperties.$authStore = authStore;

// Mount aplikasi ke elemen #app di index.html
app.mount('#app');
