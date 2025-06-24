<template>
  <header class="bg-nu-green text-white p-4 shadow-md rounded-b-lg">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between">
      <div class="flex items-center mb-2 md:mb-0">
        <!-- Logo IPNU-IPPNU Placeholder -->
        <svg class="h-10 w-10 text-white mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z"/>
        </svg>
        <h1 class="text-2xl font-bold">Web IPNU-IPPNU Ranting</h1>
      </div>
      <nav>
        <router-link to="/" class="mx-2 hover:underline">Beranda</router-link>
        <router-link to="/tentang" class="mx-2 hover:underline">Tentang</router-link>
        <router-link to="/berita" class="mx-2 hover:underline">Berita</router-link>
        <router-link to="/acara" class="mx-2 hover:underline">Acara</router-link>
        <router-link to="/anggota" class="mx-2 hover:underline">Anggota</router-link>
        <router-link to="/galeri" class="mx-2 hover:underline">Galeri</router-link>
        <router-link to="/kontak" class="mx-2 hover:underline">Kontak</router-link>
        <!-- Tampilkan tombol login/logout berdasarkan status otentikasi -->
        <router-link v-if="!authStore.isAuthenticated" to="/login" class="mx-2 bg-white text-nu-green px-3 py-1 rounded-md hover:bg-gray-100 transition duration-150">Login Admin</router-link>
        <button v-else @click="logoutAndRedirect" class="mx-2 bg-white text-nu-green px-3 py-1 rounded-md hover:bg-gray-100 transition duration-150">Logout Admin</button>
      </nav>
    </div>
  </header>
</template>

<script>
import { useRouter } from 'vue-router';
import { authStore } from '../../stores/auth.js'; // Mengimpor authStore

export default {
  name: 'AppHeader',
  setup() {
    const router = useRouter();

    const logoutAndRedirect = () => {
      authStore.logout(); // Panggil fungsi logout dari store
      router.push('/'); // Redirect ke halaman beranda setelah logout
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
/* Anda bisa menambahkan gaya khusus untuk header di sini jika diperlukan */
/* Warna didefinisikan di global style atau melalui Tailwind config */
.bg-nu-green { background-color: var(--color-nu-green); }
.text-nu-green { color: var(--color-nu-green); }
</style>
