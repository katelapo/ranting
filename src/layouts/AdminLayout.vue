<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <header class="bg-nu-green text-white p-4 shadow-md rounded-b-lg flex justify-between items-center">
      <h1 class="text-xl font-bold">Dashboard Admin Ranting</h1>
      <button @click="logoutAndRedirect" class="bg-white text-nu-green px-3 py-1 rounded-md hover:bg-gray-100 transition duration-150">Logout</button>
    </header>
    <div class="flex flex-grow">
      <aside class="w-64 bg-white p-4 shadow-md rounded-br-lg">
        <nav class="space-y-2">
          <router-link to="/admin" class="block px-3 py-2 rounded-md text-gray-700 hover:bg-nu-light-green hover:text-white transition duration-150">Dashboard</router-link>
          <router-link to="/admin/tentang" class="block px-3 py-2 rounded-md text-gray-700 hover:bg-nu-light-green hover:text-white transition duration-150">Kelola Tentang</router-link>
          <router-link to="/admin/berita" class="block px-3 py-2 rounded-md text-gray-700 hover:bg-nu-light-green hover:text-white transition duration-150">Kelola Berita</router-link>
          <router-link to="/admin/acara" class="block px-3 py-2 rounded-md text-gray-700 hover:bg-nu-light-green hover:text-white transition duration-150">Kelola Acara</router-link>
          <router-link to="/admin/anggota" class="block px-3 py-2 rounded-md text-gray-700 hover:bg-nu-light-green hover:text-white transition duration-150">Kelola Anggota</router-link>
          <router-link to="/admin/galeri" class="block px-3 py-2 rounded-md text-gray-700 hover:bg-nu-light-green hover:text-white transition duration-150">Kelola Galeri</router-link>
        </nav>
      </aside>
      <main class="flex-grow p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { authStore } from '../stores/auth.js'; // Mengimpor authStore

export default {
  name: 'AdminLayout',
  setup() {
    const router = useRouter();

    const logoutAndRedirect = () => {
      authStore.logout(); // Panggil fungsi logout dari store
      router.push('/login'); // Redirect ke halaman login setelah logout
    };

    return {
      authStore, // Sediakan authStore agar bisa diakses di template
      logoutAndRedirect
    };
  },
  data() {
    return {
      'nu-green': '#006400',
      'nu-light-green': '#38761D',
    };
  }
};
</script>

<style scoped>
/* Gaya khusus untuk layout admin jika diperlukan */
.bg-nu-green { background-color: var(--color-nu-green); }
.text-nu-green { color: var(--color-nu-green); }
.bg-nu-light-green { background-color: var(--color-nu-light-green); }
.hover\:bg-nu-green:hover { background-color: var(--color-nu-green); }
.hover\:text-white:hover { color: var(--color-white); }
</style>
