<template>
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-3xl font-bold text-nu-green mb-6 border-b-2 border-nu-light-green pb-2">Galeri Kegiatan</h2>
    <div v-if="images.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="image in images" :key="image.id" class="relative group aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-sm">
        <img :src="image.url || 'https://placehold.co/300x300/edf2f7/4a5568?text=Galeri'" :alt="image.caption" class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105">
        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p class="text-white text-center text-sm p-2">{{ image.caption }}</p>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500 italic">Belum ada gambar di galeri.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'GalleryPage',
  setup() {
    const images = ref([]);

    onMounted(() => {
      // Muat gambar dari localStorage
      images.value = JSON.parse(localStorage.getItem('galeri') || '[]');
    });

    return {
      images,
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
