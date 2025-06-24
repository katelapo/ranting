<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-3xl font-bold text-center text-nu-green mb-8">Login Admin Ranting</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-5">
          <label for="username" class="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
          <input type="text" id="username" v-model="username" class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-nu-light-green focus:border-transparent" placeholder="Masukkan username admin" required>
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
          <input type="password" id="password" v-model="password" class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-nu-light-green focus:border-transparent" placeholder="Masukkan password" required>
        </div>
        <button type="submit" class="w-full bg-nu-green hover:bg-nu-light-green text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200">
          Login
        </button>
        <p v-if="error" class="text-red-500 text-center text-sm mt-4">{{ error }}</p>
      </form>
    </div>
    <MessageBox
      :show="messageBox.show"
      :title="messageBox.title"
      :message="messageBox.message"
      :type="messageBox.type"
      @confirm="messageBox.show = false"
    />
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import MessageBox from '../components/common/MessageBox.vue';
import { authStore } from '../stores/auth.js'; // Mengimpor authStore

export default {
  name: 'LoginPage',
  components: { MessageBox },
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();

    const messageBox = reactive({
      show: false,
      title: '',
      message: '',
      type: 'info'
    });

    const handleLogin = () => {
      error.value = '';
      if (authStore.login(username.value, password.value)) {
        messageBox.title = 'Login Berhasil';
        messageBox.message = 'Anda telah berhasil login sebagai admin.';
        messageBox.type = 'info';
        messageBox.show = true;
        // Memberikan sedikit waktu agar messageBox terlihat sebelum redirect
        setTimeout(() => {
          router.push('/admin'); // Redirect ke dashboard admin
        }, 1000);
      } else {
        error.value = 'Username atau password salah!';
        messageBox.title = 'Login Gagal';
        messageBox.message = 'Username atau password yang Anda masukkan tidak valid.';
        messageBox.type = 'error';
        messageBox.show = true;
      }
    };

    return {
      username,
      password,
      error,
      handleLogin,
      messageBox
    };
  },
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
.bg-nu-green { background-color: var(--color-nu-green); }
.hover\:bg-nu-light-green:hover { background-color: var(--color-nu-light-green); }
.focus\:ring-nu-light-green:focus { border-color: var(--color-nu-light-green); box-shadow: 0 0 0 2px var(--color-nu-light-green); }
</style>
