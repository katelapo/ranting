<template>
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-3xl font-bold text-nu-green mb-6 border-b-2 border-nu-light-green pb-2">Daftar Anggota IPNU-IPPNU</h2>
    <div v-if="members.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="member in members" :key="member.id" class="border border-gray-200 rounded-lg shadow-sm p-4 text-center">
        <img :src="member.photo || 'https://placehold.co/100x100/e0ffe0/006400?text=Anggota'" alt="Image of Member" class="w-24 h-24 rounded-full mx-auto mb-3 object-cover">
        <h3 class="text-lg font-semibold text-nu-green">{{ member.name }}</h3>
        <p class="text-gray-600 text-sm">{{ member.role }}</p>
        <p class="text-gray-700 text-xs mt-2">{{ member.contact || 'Kontak tidak tersedia' }}</p>
      </div>
    </div>
    <p v-else class="text-gray-500 italic">Belum ada data anggota yang ditampilkan.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'MembersPage',
  setup() {
    const members = ref([]);

    onMounted(() => {
      // Muat anggota dari localStorage
      members.value = JSON.parse(localStorage.getItem('anggota') || '[]');
    });

    return {
      members,
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
