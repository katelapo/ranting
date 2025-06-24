<template>
  <div class="bg-white p-8 rounded-lg shadow-md">
    <router-link to="/berita" class="text-nu-light-green hover:underline mb-4 inline-block">&larr; Kembali ke Berita</router-link>
    <div v-if="newsItem">
      <h2 class="text-3xl font-bold text-nu-green mb-4">{{ newsItem.title }}</h2>
      <p class="text-gray-600 text-sm mb-4">{{ newsItem.date }}</p>
      <img :src="newsItem.image || 'https://placehold.co/600x300/edf2f7/4a5568?text=Detail+Berita'" alt="Image of News Detail" class="w-full max-h-96 object-cover rounded-lg mb-6 shadow-md">
      <div class="prose max-w-none text-gray-700 leading-relaxed">
        <p>{{ newsItem.content }}</p>
      </div>
    </div>
    <p v-else class="text-gray-500 italic">Berita tidak ditemukan.</p>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'NewsDetailPage',
  setup() {
    const route = useRoute();
    const newsItem = ref(null);

    const loadNewsItem = (id) => {
      const news = JSON.parse(localStorage.getItem('berita') || '[]');
      newsItem.value = news.find(item => item.id === id);
    };

    // Muat item saat komponen pertama kali dibuat
    onMounted(() => {
      loadNewsItem(route.params.id);
    });

    // Perhatikan perubahan ID di URL (jika navigasi antar detail berita)
    watch(() => route.params.id, (newId) => {
      loadNewsItem(newId);
    });

    return {
      newsItem,
      'nu-green': '#006400',
      'nu-light-green': '#38761D',
    };
  }
};
</script>

<style scoped>
.text-nu-green { color: var(--color-nu-green); }
.text-nu-light-green { color: var(--color-nu-light-green); }
</style>
