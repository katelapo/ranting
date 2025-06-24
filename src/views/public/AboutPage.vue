<template>
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-3xl font-bold text-nu-green mb-6 border-b-2 border-nu-light-green pb-2">Tentang IPNU-IPPNU Ranting</h2>
    <div v-if="content" class="prose max-w-none text-gray-700 leading-relaxed">
      <p>{{ content }}</p>
    </div>
    <p v-else class="text-gray-500 italic">Konten tentang organisasi belum tersedia. Silakan hubungi admin.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'AboutPage',
  setup() {
    const content = ref('');

    onMounted(() => {
      // Muat konten dari localStorage
      content.value = localStorage.getItem('tentang') || '';
    });

    return {
      content,
      'nu-green': '#006400',
      'nu-light-green': '#38761D',
    };
  }
};
</script>

<style scoped>
.text-nu-green { color: var(--color-nu-green); }
.border-nu-light-green { border-color: var(--color-nu-light-green); }
</style>
