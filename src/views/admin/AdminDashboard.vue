<template>
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-3xl font-bold text-nu-green mb-6">Selamat Datang, Admin Ranting!</h2>
    <p class="text-gray-700 mb-6">Dari sini Anda dapat mengelola seluruh konten website IPNU-IPPNU Ranting.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link to="/admin/berita" class="block bg-nu-light-green text-white p-6 rounded-lg shadow-md hover:bg-nu-green transition duration-200 text-center">
        <h3 class="text-xl font-semibold mb-2">Kelola Berita</h3>
        <p class="text-sm opacity-90">Tambah, edit, atau hapus berita terbaru.</p>
      </router-link>
      <router-link to="/admin/acara" class="block bg-nu-light-green text-white p-6 rounded-lg shadow-md hover:bg-nu-green transition duration-200 text-center">
        <h3 class="text-xl font-semibold mb-2">Kelola Acara</h3>
        <p class="text-sm opacity-90">Atur jadwal dan detail acara.</p>
      </router-link>
      <router-link to="/admin/anggota" class="block bg-nu-light-green text-white p-6 rounded-lg shadow-md hover:bg-nu-green transition duration-200 text-center">
        <h3 class="text-xl font-semibold mb-2">Kelola Anggota</h3>
        <p class="text-sm opacity-90">Tambah atau perbarui data anggota.</p>
      </router-link>
      <router-link to="/admin/galeri" class="block bg-nu-light-green text-white p-6 rounded-lg shadow-md hover:bg-nu-green transition duration-200 text-center">
        <h3 class="text-xl font-semibold mb-2">Kelola Galeri</h3>
        <p class="text-sm opacity-90">Unggah dan atur foto kegiatan.</p>
      </router-link>
      <router-link to="/admin/tentang" class="block bg-nu-light-green text-white p-6 rounded-lg shadow-md hover:bg-nu-green transition duration-200 text-center">
        <h3 class="text-xl font-semibold mb-2">Kelola Tentang</h3>
        <p class="text-sm opacity-90">Perbarui informasi tentang organisasi.</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      'nu-green': '#006400',
      'nu-light-green': '#38761D',
    };
  }
};
</script>

<style scoped>
.text-nu-green { color: var(--color-nu-green); }
.bg-nu-light-green { background-color: var(--color-nu-light-green); }
.hover\:bg-nu-green:hover { background-color: var(--color-nu-green); }
</style>
