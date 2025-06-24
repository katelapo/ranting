<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-auto transform transition-all duration-300 scale-100 opacity-100">
      <div :class="{'text-nu-green': type === 'info', 'text-red-600': type === 'error'}" class="text-xl font-bold mb-4 flex items-center">
        <span v-if="type === 'info'" class="mr-2">&#x2139;</span>
        <span v-if="type === 'error'" class="mr-2">&#x26A0;</span>
        <span v-if="type === 'confirm'" class="mr-2">&#x2753;</span>
        {{ title }}
      </div>
      <p class="text-gray-700 mb-6">{{ message }}</p>
      <div class="flex justify-end space-x-3">
        <button v-if="type === 'confirm'" @click="$emit('cancel')" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-150">Batal</button>
        <button @click="$emit('confirm')" :class="{'bg-nu-green hover:bg-nu-light-green': type !== 'error', 'bg-red-600 hover:bg-red-700': type === 'error'}" class="px-4 py-2 text-white rounded-md transition duration-150">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBox',
  props: {
    show: Boolean,
    title: String,
    message: String,
    type: {
      type: String,
      default: 'info' // info, confirm, error
    }
  },
  emits: ['confirm', 'cancel'], // Mendefinisikan event yang di-emit
  data() {
    return {
      // Tailwind colors defined directly for internal use if not globally available in template
      'nu-green': '#006400',
      'nu-light-green': '#38761D',
    };
  }
};
</script>

<style scoped>
/* Tidak perlu gaya khusus jika semua ditangani Tailwind atau gaya global */
.bg-nu-green { background-color: var(--color-nu-green); }
.hover\:bg-nu-light-green:hover { background-color: var(--color-nu-light-green); }
.text-nu-green { color: var(--color-nu-green); }
</style>
