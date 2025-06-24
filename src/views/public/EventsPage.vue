<template>
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-3xl font-bold text-nu-green mb-6 border-b-2 border-nu-light-green pb-2">Jadwal Acara</h2>
    <div v-if="events.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="item in events" :key="item.id" class="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200 p-4">
        <h3 class="text-xl font-semibold text-nu-green mb-2">{{ item.title }}</h3>
        <p class="text-gray-600 text-sm mb-1">Tanggal: {{ item.date }}</p>
        <p class="text-gray-600 text-sm mb-3">Lokasi: {{ item.location }}</p>
        <p class="text-gray-700 text-sm line-clamp-3">{{ item.description }}</p>
      </div>
    </div>
    <p v-else class="text-gray-500 italic">Belum ada acara yang dijadwalkan.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'EventsPage',
  setup() {
    const events = ref([]);

    onMounted(() => {
      // Muat acara dari localStorage
      events.value = JSON.parse(localStorage.getItem('acara') || '[]');
    });

    return {
      events,
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
