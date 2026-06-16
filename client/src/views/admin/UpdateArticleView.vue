<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const loading = ref(false)
const fetching = ref(true)
const form = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImageUrl: '',
  tags: '',
  status: 'draft',
})

onMounted(async () => {
  try {
    const { data } = await api.get(`/admin/articles/${route.params.articleId}`)
    form.value = {
      title: data.title || '',
      slug: data.slug || '',
      excerpt: data.excerpt || '',
      content: data.content || '',
      coverImageUrl: data.coverImageUrl || '',
      tags: data.tags || '',
      status: data.status || 'draft',
    }
  } catch (err) {
    toast.error('Artikel tidak ditemukan')
    router.push('/admin/articles')
  } finally {
    fetching.value = false
  }
})

const submit = async () => {
  loading.value = true
  try {
    await api.put(`/admin/articles/${route.params.articleId}`, form.value)
    toast.success('Artikel berhasil diperbarui!')
    router.push('/admin/articles')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal memperbarui artikel')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl">
    <div class="flex items-center gap-4 mb-6">
      <router-link to="/admin/articles" class="text-gray-500 hover:text-gray-700">←</router-link>
      <h1 class="font-heading text-2xl font-bold text-gray-900">Edit Artikel</h1>
    </div>

    <div v-if="fetching" class="card p-8 text-center text-gray-400">Memuat artikel...</div>

    <form v-else @submit.prevent="submit" class="space-y-5">
      <div class="card p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Judul *</label>
          <input v-model="form.title" required class="input-field w-full" placeholder="Judul artikel" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
          <input v-model="form.slug" required class="input-field w-full font-mono text-sm" placeholder="judul-artikel-seo-friendly" />
          <p class="text-xs text-gray-400 mt-1">URL: /articles/{{ form.slug || 'slug-artikel' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Excerpt (ringkasan singkat)</label>
          <textarea v-model="form.excerpt" rows="2" class="input-field w-full" placeholder="Ringkasan 1-2 kalimat untuk preview dan SEO..."></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
          <input v-model="form.coverImageUrl" class="input-field w-full" placeholder="https://..." />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tags (pisah dengan koma)</label>
          <input v-model="form.tags" class="input-field w-full" placeholder="JavaScript, Vue, Tutorial" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="form.status" class="input-field w-full">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div class="card p-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Konten (HTML diperbolehkan) *</label>
        <textarea v-model="form.content" rows="20" required
          class="input-field w-full font-mono text-sm"
          placeholder="Tulis konten artikel di sini. HTML diperbolehkan, contoh: <h2>Judul</h2><p>Paragraf...</p>"></textarea>
        <p class="text-xs text-gray-400 mt-1">Konten akan dirender sebagai HTML. Gunakan tag seperti &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;code&gt;, dll.</p>
      </div>

      <div class="flex gap-3">
        <button type="submit" :disabled="loading" class="btn-primary">
          {{ loading ? 'Menyimpan...' : 'Perbarui Artikel' }}
        </button>
        <router-link to="/admin/articles" class="btn-outline">Batal</router-link>
      </div>
    </form>
  </div>
</template>
