<template>
  <footer class="bg-nu-green text-white p-4 mt-8 shadow-inner rounded-t-lg">
    <div class="container mx-auto text-center text-sm">
      <p>&copy; {{ currentYear }} Web IPNU-IPPNU Ranting. Hak Cipta Dilindungi.</p>
      <p class="mt-1">Didedikasikan untuk pengembangan pemuda-pemudi Nahdlatul Ulama.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      'nu-green': '#006400',
    };
  }
};
</script>

<style scoped>
/* Anda bisa menambahkan gaya khusus untuk footer di sini jika diperlukan */
.bg-nu-green { background-color: var(--color-nu-green); }
</style>
