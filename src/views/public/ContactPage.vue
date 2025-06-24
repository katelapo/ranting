<template>
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-3xl font-bold text-nu-green mb-6 border-b-2 border-nu-light-green pb-2">Kontak Kami</h2>
    <div class="text-gray-700 leading-relaxed">
      <p class="mb-4">Untuk informasi lebih lanjut, silakan hubungi kami melalui:</p>
      <p class="flex items-center mb-2"><span class="text-nu-green mr-2">&#x2709;</span> Email: <a href="mailto:ipnu-ippnu.ranting@example.com" class="text-nu-light-green hover:underline">ipnu-ippnu.ranting@example.com</a></p>
      <p class="flex items-center mb-2"><span class="text-nu-green mr-2">&#x260E;</span> Telepon: (021) 123-4567</p>
      <p class="flex items-center mb-2"><span class="text-nu-green mr-2">&#x1F4CD;</span> Alamat: Jl. Contoh Desa No. 123, Kel. Contoh, Kec. Contoh, Kab. Contoh, Prov. Contoh</p>
      <p class="mt-6">Kami terbuka untuk pertanyaan, saran, dan kolaborasi. Jangan ragu untuk menghubungi pengurus ranting kami.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
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
.border-nu-light-green { border-color: var(--color-nu-light-green); }
.text-nu-light-green { color: var(--color-nu-light-green); }
</style>
