// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue'),
//     },
//   ],
// })

// export default router

import { createRouter, createWebHistory } from 'vue-router';
import PublicLayout from '../layouts/PublicLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import HomePage from '../views/public/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import ManageContent from '../views/admin/ManageContent.vue';
import NewsDetailPage from '../views/public/NewsDetailPage.vue';

// Mengimpor authStore secara langsung untuk digunakan di navigation guard
import { authStore } from '../stores/auth.js';

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', name: 'Home', component: HomePage },
      { path: 'tentang', name: 'About', component: () => import('../views/public/AboutPage.vue') },
      { path: 'berita', name: 'News', component: () => import('../views/public/NewsPage.vue') },
      { path: 'berita/:id', name: 'NewsDetail', component: NewsDetailPage, props: true },
      { path: 'acara', name: 'Events', component: () => import('../views/public/EventsPage.vue') },
      { path: 'anggota', name: 'Members', component: () => import('../views/public/MembersPage.vue') },
      { path: 'galeri', name: 'Gallery', component: () => import('../views/public/GalleryPage.vue') },
      { path: 'kontak', name: 'Contact', component: () => import('../views/public/ContactPage.vue') },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true } },
      {
        path: 'tentang',
        name: 'AdminManageAbout',
        component: ManageContent,
        props: {
          contentType: 'tentang',
          titlePrefix: 'Kelola Konten Tentang Organisasi',
          fields: [{ name: 'content', label: 'Isi Konten', type: 'textarea', required: true }]
        },
        meta: { requiresAuth: true }
      },
      {
        path: 'berita',
        name: 'AdminManageNews',
        component: ManageContent,
        props: {
          contentType: 'berita',
          titlePrefix: 'Kelola Berita',
          fields: [
            { name: 'title', label: 'Judul Berita', type: 'text', required: true },
            { name: 'date', label: 'Tanggal', type: 'date', required: true },
            { name: 'content', label: 'Isi Berita', type: 'textarea', required: true },
            { name: 'image', label: 'URL Gambar (Opsional)', type: 'image', required: false }
          ]
        },
        meta: { requiresAuth: true }
      },
      {
        path: 'acara',
        name: 'AdminManageEvents',
        component: ManageContent,
        props: {
          contentType: 'acara',
          titlePrefix: 'Kelola Acara',
          fields: [
            { name: 'title', label: 'Nama Acara', type: 'text', required: true },
            { name: 'date', label: 'Tanggal', type: 'date', required: true },
            { name: 'location', label: 'Lokasi', type: 'text', required: true },
            { name: 'description', label: 'Deskripsi', type: 'textarea', required: true }
          ]
        },
        meta: { requiresAuth: true }
      },
      {
        path: 'anggota',
        name: 'AdminManageMembers',
        component: ManageContent,
        props: {
          contentType: 'anggota',
          titlePrefix: 'Kelola Anggota',
          fields: [
            { name: 'name', label: 'Nama Lengkap', type: 'text', required: true },
            { name: 'role', label: 'Jabatan/Peran', type: 'text', required: true },
            { name: 'contact', label: 'Kontak (Opsional)', type: 'text', required: false },
            { name: 'photo', label: 'URL Foto (Opsional)', type: 'image', required: false }
          ]
        },
        meta: { requiresAuth: true }
      },
      {
        path: 'galeri',
        name: 'AdminManageGallery',
        component: ManageContent,
        props: {
          contentType: 'galeri',
          titlePrefix: 'Kelola Galeri',
          fields: [
            { name: 'url', label: 'URL Gambar', type: 'image', required: true },
            { name: 'caption', label: 'Keterangan Gambar', type: 'textarea', required: false }
          ]
        },
        meta: { requiresAuth: true }
      }
    ],
  },
  // Catch-all route for 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/' // Redirect ke beranda jika tidak ditemukan
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Memastikan halaman selalu dimulai dari atas saat navigasi
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  }
});

// Navigation Guard untuk proteksi rute admin
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login'); // Redirect ke halaman login jika tidak terautentikasi
  } else {
    next(); // Lanjutkan navigasi
  }
});

export default router;
