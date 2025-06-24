<template>
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-3xl font-bold text-nu-green mb-6">{{ titlePrefix }}</h2>

    <!-- Form Tambah/Edit -->
    <div class="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
      <h3 class="text-xl font-semibold text-nu-light-green mb-4">{{ editingItem ? 'Edit' : 'Tambah Baru' }}</h3>
      <form @submit.prevent="saveItem" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="field in fields" :key="field.name" :class="field.type === 'textarea' || field.type === 'image' ? 'md:col-span-2' : ''">
          <label :for="field.name" class="block text-gray-700 text-sm font-semibold mb-2">{{ field.label }}:</label>
          <input v-if="field.type === 'text' || field.type === 'date' || field.type === 'url'"
                 :type="field.type"
                 :id="field.name"
                 v-model="currentItem[field.name]"
                 class="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-nu-light-green"
                 :required="field.required">
          <textarea v-else-if="field.type === 'textarea'"
                    :id="field.name"
                    v-model="currentItem[field.name]"
                    rows="4"
                    class="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-nu-light-green"
                    :required="field.required"></textarea>
          <!-- Simulasi input gambar: hanya URL. Unggah file memerlukan backend. -->
          <input v-else-if="field.type === 'image'"
                 type="url"
                 :id="field.name"
                 v-model="currentItem[field.name]"
                 class="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-nu-light-green"
                 placeholder="Tempel URL gambar (ex: https://placehold.co/600x300)"
                 :required="field.required">
        </div>
        <div class="md:col-span-2 flex justify-end space-x-3 mt-4">
          <button type="button" @click="cancelEdit" v-if="editingItem" class="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition duration-150">Batal</button>
          <button type="submit" class="bg-nu-green text-white px-5 py-2 rounded-lg hover:bg-nu-light-green transition duration-150">
            {{ editingItem ? 'Simpan Perubahan' : 'Tambah' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Daftar Konten -->
    <h3 class="text-xl font-semibold text-nu-light-green mb-4">Daftar {{ titlePrefix.replace('Kelola ', '') }}</h3>
    <div v-if="items.length > 0 && contentType !== 'tentang'" class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th v-for="field in fields" :key="'header-' + field.name" class="py-3 px-6 text-left">{{ field.label }}</th>
            <th class="py-3 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody class="text-gray-700 text-sm font-light">
          <tr v-for="item in items" :key="item.id" class="border-b border-gray-200 hover:bg-gray-50">
            <td v-for="field in fields" :key="'cell-' + item.id + '-' + field.name" class="py-3 px-6 text-left whitespace-nowrap">
              <template v-if="field.name === 'photo' || field.name === 'image'">
                <img :src="item[field.name] || 'https://placehold.co/50x50/e0ffe0/006400?text=NA'" alt="Gambar" class="w-12 h-12 rounded-md object-cover">
              </template>
              <template v-else-if="field.type === 'textarea'">
                <span class="line-clamp-2">{{ item[field.name] }}</span>
              </template>
              <template v-else>
                {{ item[field.name] }}
              </template>
            </td>
            <td class="py-3 px-6 text-center whitespace-nowrap">
              <div class="flex item-center justify-center space-x-2">
                <button @click="editItem(item)" class="text-blue-600 hover:text-blue-800 transition duration-150">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.828-2.828z" />
                  </svg>
                </button>
                <button @click="confirmDeleteItem(item.id)" class="text-red-600 hover:text-red-800 transition duration-150">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else-if="contentType !== 'tentang'" class="text-gray-500 italic mt-4">Belum ada data untuk ditampilkan.</p>
    <p v-else class="text-gray-500 italic mt-4">Silakan perbarui konten "Tentang" di atas.</p>

    <MessageBox
      :show="messageBox.show"
      :title="messageBox.title"
      :message="messageBox.message"
      :type="messageBox.type"
      @confirm="handleMessageBoxConfirm"
      @cancel="handleMessageBoxCancel"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import MessageBox from '../../components/common/MessageBox.vue';

export default {
  name: 'ManageContent',
  components: { MessageBox },
  props: {
    contentType: String, // 'berita', 'acara', 'anggota', 'tentang', 'galeri'
    titlePrefix: String,
    fields: Array // Contoh: [{ name: 'title', label: 'Judul', type: 'text' }]
  },
  setup(props) {
    // State untuk daftar item (hanya relevan jika contentType bukan 'tentang')
    const items = ref([]);
    // State untuk item yang sedang di-edit atau baru
    const currentItem = reactive({});
    // Untuk melacak apakah sedang dalam mode edit
    const editingItem = ref(null);
    // Untuk menyimpan ID item yang akan dihapus
    const itemToDeleteId = ref(null);

    // State untuk MessageBox
    const messageBox = reactive({
      show: false,
      title: '',
      message: '',
      type: 'info',
      callback: null // Callback untuk aksi konfirmasi
    });

    // Fungsi untuk mereset currentItem ke kondisi awal kosong atau nilai 'tentang'
    const resetCurrentItem = () => {
      // Bersihkan semua properti di currentItem
      for (const key in currentItem) {
        delete currentItem[key];
      }
      // Inisialisasi properti berdasarkan 'fields' prop
      props.fields.forEach(field => {
        currentItem[field.name] = '';
      });

      // Perlakuan khusus untuk contentType 'tentang'
      if (props.contentType === 'tentang') {
        currentItem.content = localStorage.getItem('tentang') || '';
      }
    };

    // Muat data dari localStorage
    const loadItems = () => {
      if (props.contentType === 'tentang') {
        // Konten 'tentang' adalah string tunggal, bukan array item
        currentItem.content = localStorage.getItem('tentang') || '';
        items.value = []; // Pastikan items kosong untuk contentType 'tentang'
      } else {
        items.value = JSON.parse(localStorage.getItem(props.contentType) || '[]');
      }
    };

    // Simpan data ke localStorage
    const saveItems = () => {
      if (props.contentType === 'tentang') {
        localStorage.setItem('tentang', currentItem.content);
      } else {
        localStorage.setItem(props.contentType, JSON.stringify(items.value));
      }
      loadItems(); // Refresh daftar/konten setelah simpan
    };

    // Tambah atau Edit item
    const saveItem = () => {
      if (props.contentType === 'tentang') {
        // Hanya simpan konten 'tentang'
        saveItems();
        messageBox.title = 'Berhasil';
        messageBox.message = 'Konten "Tentang Organisasi" berhasil diperbarui.';
        messageBox.type = 'info';
        messageBox.show = true;
        return;
      }

      if (editingItem.value) {
        // Update item yang sudah ada
        const index = items.value.findIndex(item => item.id === editingItem.value.id);
        if (index !== -1) {
          // Buat salinan baru untuk memastikan reaktivitas
          items.value[index] = { ...currentItem };
          messageBox.title = 'Berhasil';
          messageBox.message = 'Data berhasil diperbarui.';
          messageBox.type = 'info';
          messageBox.show = true;
        }
      } else {
        // Tambah item baru
        currentItem.id = Date.now().toString(); // ID unik sederhana berdasarkan timestamp
        // Tambahkan tanggal otomatis untuk berita/acara jika field 'date' ada dan belum diisi
        if ((props.contentType === 'berita' || props.contentType === 'acara') && !currentItem.date) {
            currentItem.date = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
        }
        items.value.push({ ...currentItem });
        messageBox.title = 'Berhasil';
        messageBox.message = 'Data berhasil ditambahkan.';
        messageBox.type = 'info';
        messageBox.show = true;
      }
      saveItems(); // Simpan perubahan ke localStorage
      resetCurrentItem(); // Reset form setelah simpan
      editingItem.value = null; // Keluar dari mode edit
    };

    // Set item untuk diedit
    const editItem = (item) => {
      editingItem.value = item;
      // Salin properti item ke currentItem agar form terisi
      // Gunakan Object.assign untuk reaktivitas dengan reactive proxy
      Object.assign(currentItem, item);
    };

    // Batalkan mode edit
    const cancelEdit = () => {
      editingItem.value = null;
      resetCurrentItem();
    };

    // Konfirmasi penghapusan item
    const confirmDeleteItem = (id) => {
      itemToDeleteId.value = id; // Simpan ID untuk penghapusan
      messageBox.title = 'Konfirmasi Penghapusan';
      messageBox.message = 'Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.';
      messageBox.type = 'confirm';
      messageBox.callback = () => deleteItem(id); // Set callback untuk dieksekusi jika dikonfirmasi
      messageBox.show = true;
    };

    // Hapus item
    const deleteItem = (id) => {
      items.value = items.value.filter(item => item.id !== id);
      saveItems(); // Simpan perubahan setelah penghapusan
      messageBox.title = 'Berhasil Dihapus';
      messageBox.message = 'Item berhasil dihapus.';
      messageBox.type = 'info';
      messageBox.show = true; // Tampilkan pesan berhasil dihapus
    };

    // Handler untuk konfirmasi MessageBox
    const handleMessageBoxConfirm = () => {
      if (messageBox.callback) {
        messageBox.callback(); // Jalankan callback yang sudah diatur
      }
      messageBox.show = false;
      messageBox.callback = null; // Reset callback
    };

    // Handler untuk pembatalan MessageBox
    const handleMessageBoxCancel = () => {
      messageBox.show = false;
      messageBox.callback = null; // Reset callback
    };

    // Muat data saat komponen dibuat
    onMounted(() => {
      loadItems();
      resetCurrentItem(); // Pastikan currentItem terinisialisasi
    });

    return {
      items,
      currentItem,
      editingItem,
      saveItem,
      editItem,
      cancelEdit,
      confirmDeleteItem,
      messageBox,
      handleMessageBoxConfirm,
      handleMessageBoxCancel,
      'nu-green': '#006400',
      'nu-light-green': '#38761D',
    };
  }
};
</script>

<style scoped>
.text-nu-green { color: var(--color-nu-green); }
.text-nu-light-green { color: var(--color-nu-light-green); }
.bg-nu-green { background-color: var(--color-nu-green); }
.hover\:bg-nu-light-green:hover { background-color: var(--color-nu-light-green); }
.focus\:ring-nu-light-green:focus { border-color: var(--color-nu-light-green); box-shadow: 0 0 0 2px var(--color-nu-light-green); }
</style>
