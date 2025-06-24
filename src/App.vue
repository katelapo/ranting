<!-- <script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template> -->

<template>
  <router-view />
</template>

<script>
// Komponen App.vue ini akan bertindak sebagai komponen root yang merender router-view.
// Layouts (PublicLayout dan AdminLayout) akan diatur oleh router,
// sehingga App.vue tetap bersih dan fokus pada root routing.
export default {
  name: 'App',
  // Tidak perlu setup atau components di sini karena router-view akan mengelola semuanya.
};
</script>

<style>
/* Anda bisa menambahkan gaya global di sini jika diperlukan,
   meskipun sebagian besar gaya sudah ditangani oleh Tailwind CSS di index.html */
</style>
