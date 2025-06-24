<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    <main class="flex-grow container mx-auto px-4 py-8">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../components/common/AppHeader.vue';
import AppFooter from '../components/common/AppFooter.vue';

export default {
  name: 'PublicLayout',
  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<style scoped>
/* Gaya khusus untuk layout publik jika diperlukan */
</style>
