<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const articles = ref([])
const loading = ref(true)
const totalPages = ref(1)
const currentPage = ref(1)
const searchQuery = ref(route.query.search || '')
const activeTag = ref(route.query.tag || '')

const fetchArticles = async () => {
  loading.value = true
  try {
    const params = { page: currentPage.value }
    if (searchQuery.value) params.search = searchQuery.value
    if (activeTag.value) params.tag = activeTag.value
    const { data } = await api.get('/public/articles', { params })
    articles.value = data.articles
    totalPages.value = data.totalPages
    currentPage.value = data.currentPage
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  router.replace({ query: { ...(searchQuery.value && { search: searchQuery.value }), ...(activeTag.value && { tag: activeTag.value }) } })
  fetchArticles()
}

const setTag = (tag) => {
  activeTag.value = activeTag.value === tag ? '' : tag
  currentPage.value = 1
  handleSearch()
}

const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

onMounted(fetchArticles)
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-5xl mx-auto px-4">
      <div class="text-center mb-10">
        <h1 class="font-heading text-4xl font-bold text-gray-900 mb-3">Artikel & Tutorial</h1>
        <p class="text-gray-500 text-lg">Tips, tutorial, dan wawasan seputar dunia tech dari tim Bimble.id</p>
      </div>

      <!-- Search -->
      <div class="flex gap-3 mb-8">
        <input v-model="searchQuery" @keydown.enter="handleSearch"
          placeholder="Cari artikel..."
          class="input-field flex-1" />
        <button @click="handleSearch" class="btn-primary px-6">Cari</button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="card animate-pulse">
          <div class="h-48 bg-gray-200 rounded-t-xl"></div>
          <div class="p-5 space-y-3">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      <!-- Articles Grid -->
      <div v-else-if="articles.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <router-link v-for="article in articles" :key="article.id"
          :to="`/articles/${article.slug}`"
          class="card hover:shadow-lg transition-shadow overflow-hidden group">
          <div class="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
            <img v-if="article.coverImageUrl" :src="article.coverImageUrl" :alt="article.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div v-else class="w-full h-full flex items-center justify-center text-5xl">📝</div>
          </div>
          <div class="p-5">
            <!-- Tags -->
            <div v-if="article.tags" class="flex flex-wrap gap-1 mb-3">
              <button v-for="tag in article.tags.split(',').slice(0, 2)" :key="tag"
                @click.prevent="setTag(tag.trim())"
                :class="activeTag === tag.trim() ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'"
                class="text-xs px-2 py-0.5 rounded-full font-medium hover:bg-indigo-600 hover:text-white transition-colors">
                {{ tag.trim() }}
              </button>
            </div>
            <h2 class="font-heading font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
              {{ article.title }}
            </h2>
            <p v-if="article.excerpt" class="text-sm text-gray-500 line-clamp-2 mb-4">{{ article.excerpt }}</p>
            <div class="flex items-center justify-between text-xs text-gray-400">
              <span>{{ article.Author?.name }}</span>
              <span>{{ formatDate(article.publishedAt) }}</span>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Empty state -->
      <div v-else class="card p-16 text-center">
        <div class="text-6xl mb-4">📭</div>
        <p class="text-gray-500">Tidak ada artikel yang ditemukan.</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center gap-2">
        <button @click="currentPage--; fetchArticles()" :disabled="currentPage <= 1" class="btn-outline px-4 py-2 disabled:opacity-40">← Prev</button>
        <span class="flex items-center px-4 text-sm text-gray-600">{{ currentPage }} / {{ totalPages }}</span>
        <button @click="currentPage++; fetchArticles()" :disabled="currentPage >= totalPages" class="btn-outline px-4 py-2 disabled:opacity-40">Next →</button>
      </div>
    </div>
  </div>
</template>
