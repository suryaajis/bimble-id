<template>
  <div v-if="loading" class="max-w-7xl mx-auto px-4 py-10"><LoadingSpinner /></div>

  <div v-else-if="course" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span v-if="course.Category" class="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">{{ course.Category.name }}</span>
            <span :class="difficultyClass">{{ course.difficulty }}</span>
          </div>
          <h1 class="font-heading text-3xl font-bold text-gray-900 mb-3">{{ course.name }}</h1>
          <p v-if="course.Instructor" class="text-sm text-gray-500 mb-3">By <span class="font-medium text-gray-700">{{ course.Instructor.name }}</span></p>
          <p class="text-gray-500 leading-relaxed">{{ course.description }}</p>
        </div>

        <!-- Preview Video -->
        <div v-if="course.Videos?.[0]">
          <div class="flex items-center gap-2 mb-3">
            <h2 class="font-heading font-bold text-gray-900">Preview: {{ course.Videos[0].name }}</h2>
            <span v-if="course.Videos[0].youtubeUrl" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8z"/><polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98"/></svg>
              YouTube
            </span>
          </div>
          <div class="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
            <iframe :src="getVideoSrc(course.Videos[0])" class="absolute inset-0 w-full h-full" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
          </div>
        </div>

        <!-- Comments -->
        <div v-if="firstVideoComments.length">
          <h2 class="font-heading font-bold text-gray-900 mb-4">Comments ({{ firstVideoComments.length }})</h2>
          <div class="space-y-3">
            <div v-for="c in firstVideoComments" :key="c.id" class="flex gap-3">
              <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-xs font-semibold text-gray-500">{{ c.User?.name[0]?.toUpperCase() }}</span>
              </div>
              <div class="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                <p class="text-xs font-semibold text-gray-700 mb-1">{{ c.User?.name }}</p>
                <p class="text-sm text-gray-600">{{ c.comment }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <div class="card p-6 sticky top-24 space-y-5">
          <img v-if="course.thumbnailUrl" :src="course.thumbnailUrl" :alt="course.name" class="w-full aspect-video object-cover rounded-xl" />

          <div>
            <div class="text-3xl font-heading font-bold text-gray-900">{{ isFree ? 'Gratis' : formatPrice(course.price) }}</div>
            <div class="flex items-center gap-2 mt-2">
              <div class="flex text-yellow-400 text-sm">{{ '★'.repeat(Math.round(course.avgRating || 0)) }}{{ '☆'.repeat(10 - Math.round(course.avgRating || 0)) }}</div>
              <span class="text-sm text-gray-500">{{ course.avgRating ? `${course.avgRating}/10` : 'No ratings yet' }}</span>
            </div>
          </div>

          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
              {{ course.Videos?.length || 0 }} videos
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Full lifetime access
            </div>
          </div>

          <button v-if="auth.isUser" @click="handleAction" :disabled="enrolling" class="btn-brand w-full py-3">
            {{ enrolling ? 'Processing...' : (isFree ? 'Enroll Gratis' : 'Purchase Course') }}
          </button>
          <RouterLink v-else-if="!auth.isLoggedIn" to="/login" class="btn-primary w-full py-3 text-center">Log in to Purchase</RouterLink>

          <!-- Video List -->
          <div>
            <h3 class="font-semibold text-gray-900 text-sm mb-3">Course Content</h3>
            <div class="space-y-1.5">
              <div v-for="(video, i) in course.Videos" :key="video.id" class="flex items-center gap-3 px-3 py-2.5 rounded-lg" :class="i === 0 ? 'bg-primary-50' : 'bg-gray-50'">
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" :class="i === 0 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'">{{ i + 1 }}</span>
                <span class="text-xs text-gray-700 flex-1 truncate">{{ video.name }}</span>
                <svg v-if="i > 0" class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useAuthStore } from '@/stores/auth'
import { videoSrc as getVideoSrc } from '@/composables/useYoutube'
import api from '@/api'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { useJsonLd } from '@/composables/useJsonLd'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

const course = ref(null)
const loading = ref(true)
const enrolling = ref(false)

const seoOptions = computed(() => course.value ? {
  title: course.value.name,
  description: course.value.description?.slice(0, 160),
  image: course.value.thumbnailUrl,
  type: 'website',
  keywords: `${course.value.name}, kursus online, bimble`,
} : null)

useSeoMeta(seoOptions)

watch(course, (val) => {
  if (!val) return
  const existing = document.querySelector('script[data-course-ld]')
  if (existing) existing.remove()
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-course-ld', 'true')
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: val.name,
    description: val.description,
    provider: { '@type': 'Organization', name: 'Bimble.id' },
    offers: {
      '@type': 'Offer',
      price: val.price,
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
    },
    courseLevel: val.difficulty,
  })
  document.head.appendChild(script)
}, { immediate: true })

const firstVideoComments = computed(() => course.value?.Videos?.[0]?.Comments || [])
const difficultyClass = computed(() => ({ easy: 'badge-easy', medium: 'badge-medium', hard: 'badge-hard' }[course.value?.difficulty] ?? 'badge-easy'))
const isFree = computed(() => !course.value?.price || Number(course.value.price) <= 0)

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)
}

async function handleAction() {
  // Course berbayar -> ke halaman pembayaran. Course gratis -> langsung enroll.
  if (!isFree.value) {
    return router.push(`/buy/${course.value.id}`)
  }

  enrolling.value = true
  try {
    await api.post(`/public/my-courses/${course.value.id}`)
    toast.success('Berhasil! Course gratis sudah ditambahkan.')
    router.push('/my-courses')
  } catch (err) {
    const msg = err.response?.data?.message || ''
    if (msg.toLowerCase().includes('already')) {
      router.push('/my-courses')
    } else {
      toast.error(msg || 'Gagal menambahkan course.')
    }
  } finally {
    enrolling.value = false
  }
}

onMounted(async () => {
  try {
    const { data } = await api.get(`/public/courses/${route.params.courseId}`)
    course.value = data
  } catch {
    toast.error('Course not found')
    router.push('/courses')
  } finally {
    loading.value = false
  }
})
</script>
