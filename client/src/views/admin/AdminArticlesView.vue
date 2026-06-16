<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const articles = ref([])
const loading = ref(true)
const search = ref('')

const fetchArticles = async () => {
  loading.value = true
  try {
    const { data } = await api.get('/admin/articles', { params: { search: search.value } })
    articles.value = data.articles
  } catch (err) {
    toast.error('Gagal memuat artikel')
  } finally {
    loading.value = false
  }
}

const toggleStatus = async (article) => {
  try {
    const { data } = await api.patch(`/admin/articles/${article.id}/status`)
    article.status = data.status
    toast.success(`Artikel ${data.status === 'published' ? 'dipublikasikan' : 'dijadikan draft'}`)
  } catch (err) {
    toast.error('Gagal mengubah status')
  }
}

const deleteArticle = async (id) => {
  if (!confirm('Yakin ingin menghapus artikel ini?')) return
  try {
    await api.delete(`/admin/articles/${id}`)
    articles.value = articles.value.filter(a => a.id !== id)
    toast.success('Artikel dihapus')
  } catch (err) {
    toast.error('Gagal menghapus artikel')
  }
}

const formatDate = (date) => new Date(date).toLocaleDateString('id-ID')

onMounted(fetchArticles)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="font-heading text-2xl font-bold text-gray-900">Manajemen Artikel</h1>
      <router-link to="/admin/articles/add" class="btn-primary">+ Artikel Baru</router-link>
    </div>

    <div class="flex gap-3 mb-6">
      <input v-model="search" @keydown.enter="fetchArticles" placeholder="Cari judul artikel..." class="input-field max-w-sm" />
      <button @click="fetchArticles" class="btn-outline">Cari</button>
    </div>

    <div class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="text-left px-4 py-3 text-gray-600 font-semibold">Judul</th>
            <th class="text-left px-4 py-3 text-gray-600 font-semibold">Status</th>
            <th class="text-left px-4 py-3 text-gray-600 font-semibold">Views</th>
            <th class="text-left px-4 py-3 text-gray-600 font-semibold">Tanggal</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="loading">
            <td colspan="5" class="px-4 py-8 text-center text-gray-400">Memuat...</td>
          </tr>
          <tr v-else-if="articles.length === 0">
            <td colspan="5" class="px-4 py-8 text-center text-gray-400">Belum ada artikel</td>
          </tr>
          <tr v-for="article in articles" :key="article.id" class="hover:bg-gray-50">
            <td class="px-4 py-3">
              <p class="font-medium text-gray-900 truncate max-w-xs">{{ article.title }}</p>
              <p class="text-xs text-gray-400">{{ article.slug }}</p>
            </td>
            <td class="px-4 py-3">
              <button @click="toggleStatus(article)"
                :class="article.status === 'published' ? 'badge-active' : 'badge-inactive'"
                class="cursor-pointer">
                {{ article.status === 'published' ? 'Published' : 'Draft' }}
              </button>
            </td>
            <td class="px-4 py-3 text-gray-600">{{ article.viewCount }}</td>
            <td class="px-4 py-3 text-gray-500 text-xs">{{ formatDate(article.createdAt) }}</td>
            <td class="px-4 py-3">
              <div class="flex gap-2 justify-end">
                <router-link :to="`/admin/articles/${article.id}/edit`" class="btn-outline text-xs px-3 py-1">Edit</router-link>
                <button @click="deleteArticle(article.id)" class="btn-danger text-xs px-3 py-1">Hapus</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
