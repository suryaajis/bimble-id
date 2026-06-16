<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'
import { useSeoMeta } from '@/composables/useSeoMeta'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const loading = ref(true)

const seoOptions = computed(() => article.value ? {
  title: article.value.title,
  description: article.value.excerpt || article.value.content?.replace(/<[^>]*>/g, '').slice(0, 160),
  image: article.value.coverImageUrl,
  type: 'article',
  keywords: article.value.tags,
} : null)

useSeoMeta(seoOptions)

const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

onMounted(async () => {
  try {
    const { data } = await api.get(`/public/articles/${route.params.slug}`)
    article.value = data
  } catch (err) {
    if (err.response?.status === 404) router.push('/articles')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4">
      <div v-if="loading" class="animate-pulse space-y-4">
        <div class="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div class="h-64 bg-gray-200 rounded-xl"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>

      <article v-else-if="article">
        <!-- Back -->
        <router-link to="/articles" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-8 group">
          <span>←</span> <span class="group-hover:underline">Semua Artikel</span>
        </router-link>

        <!-- Cover Image -->
        <div v-if="article.coverImageUrl" class="mb-8 rounded-xl overflow-hidden h-72">
          <img :src="article.coverImageUrl" :alt="article.title" class="w-full h-full object-cover" />
        </div>

        <!-- Tags -->
        <div v-if="article.tags" class="flex flex-wrap gap-2 mb-4">
          <router-link v-for="tag in article.tags.split(',')" :key="tag"
            :to="`/articles?tag=${tag.trim()}`"
            class="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium hover:bg-indigo-100">
            {{ tag.trim() }}
          </router-link>
        </div>

        <!-- Title -->
        <h1 class="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{{ article.title }}</h1>

        <!-- Meta -->
        <div class="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
          <span>✍️ {{ article.Author?.name }}</span>
          <span>📅 {{ formatDate(article.publishedAt) }}</span>
          <span>👁️ {{ article.viewCount }} kali dibaca</span>
        </div>

        <!-- Content -->
        <div class="prose prose-gray max-w-none" v-html="article.content"></div>

        <!-- Bottom share -->
        <div class="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between">
          <router-link to="/articles" class="btn-outline text-sm">← Kembali ke Artikel</router-link>
          <button @click="navigator.clipboard.writeText(window.location.href)"
            class="btn-outline text-sm">Salin Link</button>
        </div>
      </article>
    </div>
  </div>
</template>
