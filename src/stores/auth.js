import { reactive } from 'vue';

// Auth store sederhana menggunakan reactive untuk state manajemen
export const authStore = reactive({
    isAuthenticated: localStorage.getItem('adminToken') === 'true', // Cek token di localStorage saat inisialisasi
    adminToken: localStorage.getItem('adminToken') || null,

    login(username, password) {
        // Simulasi login admin: username 'ranting', password 'admin123'
        if (username === 'ranting' && password === 'admin123') {
            this.isAuthenticated = true;
            this.adminToken = 'true'; // Gunakan token sederhana 'true'
            localStorage.setItem('adminToken', 'true'); // Simpan status login di localStorage
            return true;
        }
        return false;
    },
    logout() {
        this.isAuthenticated = false;
        this.adminToken = null;
        localStorage.removeItem('adminToken'); // Hapus status login dari localStorage
    }
});
