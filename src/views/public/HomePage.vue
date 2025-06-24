<template>
  <div class="text-center py-12 bg-white rounded-lg shadow-md">
    <h2 class="text-4xl font-extrabold text-nu-green mb-4">Selamat Datang di Web IPNU-IPPNU Ranting</h2>
    <p class="text-lg text-gray-700 mb-6">Wadah perjuangan dan pengembangan potensi pemuda-pemudi Nahdlatul Ulama.</p>
    <img src="https://placehold.co/600x300/e0ffe0/006400?text=IPNU+IPPNU" alt="Image of IPNU IPPNU Banner" class="mx-auto rounded-lg shadow-md max-w-full h-auto mb-6">
    <router-link to="/berita" class="inline-block bg-nu-green text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-nu-light-green transition duration-300 shadow-lg">Lihat Berita Terbaru</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      'nu-green': '#006400',
      'nu-light-green': '#38761D',
    };
  }
};
</script>

<style scoped>
/* Gaya khusus untuk halaman beranda jika diperlukan */
.text-nu-green { color: var(--color-nu-green); }
.bg-nu-green { background-color: var(--color-nu-green); }
.hover\:bg-nu-light-green:hover { background-color: var(--color-nu-light-green); }
</style>
