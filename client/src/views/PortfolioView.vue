<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const portfolio = ref(null)
const loading = ref(true)
const error = ref(null)
const copied = ref(false)

onMounted(async () => {
  try {
    const { data } = await api.get(`/public/portfolio/${route.params.username}`)
    portfolio.value = data
  } catch (err) {
    if (err.response?.status === 404) error.value = 'Pengguna tidak ditemukan'
    else error.value = 'Gagal memuat portfolio'
  } finally {
    loading.value = false
  }
})

const difficultyClass = (d) => ({ easy: 'badge-easy', medium: 'badge-medium', hard: 'badge-hard' }[d] || '')

const shareUrl = computed(() => window.location.href)

const copyLink = async () => {
  await navigator.clipboard.writeText(shareUrl.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

const memberYear = computed(() => {
  if (!portfolio.value?.stats.memberSince) return ''
  return new Date(portfolio.value.stats.memberSince).getFullYear()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-screen gap-4">
      <div class="text-6xl">🔍</div>
      <h1 class="text-2xl font-bold text-gray-800">{{ error }}</h1>
      <button @click="router.push('/')" class="btn-primary">Kembali ke Beranda</button>
    </div>

    <!-- Portfolio Content -->
    <div v-else class="max-w-4xl mx-auto px-4 py-12">

      <!-- Header Card -->
      <div class="card p-8 mb-8 text-center">
        <div class="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl font-bold text-white">{{ portfolio.user.name.charAt(0).toUpperCase() }}</span>
        </div>
        <h1 class="font-heading text-3xl font-bold text-gray-900 mb-1">{{ portfolio.user.name }}</h1>
        <p class="text-gray-500 text-sm mb-6">Member sejak {{ memberYear }}</p>

        <!-- Stats Row -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="bg-indigo-50 rounded-xl p-4">
            <div class="text-2xl font-bold text-indigo-600">{{ portfolio.stats.totalCourses }}</div>
            <div class="text-xs text-gray-500 mt-1">Kursus Selesai</div>
          </div>
          <div class="bg-orange-50 rounded-xl p-4">
            <div class="text-2xl font-bold text-orange-500">{{ portfolio.stats.totalRoadmaps }}</div>
            <div class="text-xs text-gray-500 mt-1">Roadmap Diikuti</div>
          </div>
          <div class="bg-green-50 rounded-xl p-4">
            <div class="text-2xl font-bold text-green-600">{{ portfolio.stats.averageRating ?? '-' }}</div>
            <div class="text-xs text-gray-500 mt-1">Rata-rata Rating</div>
          </div>
        </div>

        <!-- Share Button -->
        <button @click="copyLink" class="btn-outline text-sm gap-2 inline-flex items-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
          </svg>
          {{ copied ? 'Link disalin! ✓' : 'Bagikan Portfolio' }}
        </button>
      </div>

      <!-- Skills Section -->
      <div v-if="portfolio.skills.length > 0" class="card p-6 mb-8">
        <h2 class="font-heading text-xl font-bold text-gray-900 mb-4">🎯 Skills</h2>
        <div class="flex flex-wrap gap-2">
          <span v-for="skill in portfolio.skills" :key="skill"
            class="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium">
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Courses Section -->
      <div v-if="portfolio.courses.length > 0" class="card p-6 mb-8">
        <h2 class="font-heading text-xl font-bold text-gray-900 mb-4">📚 Kursus yang Diselesaikan</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="course in portfolio.courses" :key="course.id"
            class="flex gap-3 p-3 bg-gray-50 rounded-xl items-center">
            <img v-if="course.thumbnailUrl" :src="course.thumbnailUrl" :alt="course.name"
              class="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
            <div v-else class="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="text-2xl">📖</span>
            </div>
            <div class="min-w-0">
              <p class="font-semibold text-gray-800 text-sm truncate">{{ course.name }}</p>
              <p class="text-xs text-gray-500 mb-1">{{ course.category }}</p>
              <span :class="difficultyClass(course.difficulty)" class="text-xs">{{ course.difficulty }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Roadmaps Section -->
      <div v-if="portfolio.roadmaps.length > 0" class="card p-6 mb-8">
        <h2 class="font-heading text-xl font-bold text-gray-900 mb-4">🗺️ Learning Roadmaps</h2>
        <div class="space-y-3">
          <div v-for="roadmap in portfolio.roadmaps" :key="roadmap.id"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <span class="text-2xl">{{ roadmap.icon || '📍' }}</span>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-800 text-sm">{{ roadmap.title }}</p>
              <p class="text-xs text-gray-500">{{ roadmap.skillDomain }}</p>
            </div>
            <span :class="roadmap.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'"
              class="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0">
              {{ roadmap.status === 'completed' ? 'Selesai' : 'Sedang Belajar' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="portfolio.courses.length === 0 && portfolio.roadmaps.length === 0" class="card p-12 text-center">
        <div class="text-6xl mb-4">📭</div>
        <p class="text-gray-500">Pengguna ini belum menyelesaikan kursus apapun.</p>
      </div>

      <!-- Bimble branding -->
      <div class="text-center mt-8">
        <p class="text-sm text-gray-400">Portfolio ini dibuat dengan</p>
        <p class="font-heading font-bold text-indigo-600">Bimble<span class="text-orange-500">.id</span></p>
      </div>
    </div>
  </div>
</template>
