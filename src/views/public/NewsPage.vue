<template>
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-3xl font-bold text-nu-green mb-6 border-b-2 border-nu-light-green pb-2">Berita Terbaru</h2>
    <div v-if="news.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in news" :key="item.id" class="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200 overflow-hidden">
        <img :src="item.image || 'https://placehold.co/400x200/edf2f7/4a5568?text=Berita'" alt="Image of News" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-semibold text-nu-green mb-2">{{ item.title }}</h3>
          <p class="text-gray-600 text-sm mb-3">{{ item.date }}</p>
          <p class="text-gray-700 text-sm line-clamp-3 mb-4">{{ item.content }}</p>
          <router-link :to="'/berita/' + item.id" class="text-nu-light-green hover:underline">Baca Selengkapnya</router-link>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500 italic">Belum ada berita yang dipublikasikan.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'NewsPage',
  setup() {
    const news = ref([]);

    onMounted(() => {
      // Muat berita dari localStorage
      news.value = JSON.parse(localStorage.getItem('berita') || '[]');
    });

    return {
      news,
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
