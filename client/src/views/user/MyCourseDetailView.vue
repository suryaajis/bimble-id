<template>
  <div v-if="loading" class="max-w-7xl mx-auto px-4 py-10"><LoadingSpinner /></div>

  <div v-else-if="data" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Progress Bar -->
    <div class="mb-6 card p-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-700">
          {{ progressData.completedCount }} dari {{ progressData.totalVideos }} video selesai
        </span>
        <span class="text-sm font-bold" :class="progressData.percentage === 100 ? 'text-green-600' : 'text-primary-600'">
          {{ progressData.percentage }}%
        </span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div
          class="h-2.5 rounded-full transition-all duration-500"
          :class="progressData.percentage === 100 ? 'bg-green-500' : 'bg-primary-600'"
          :style="{ width: progressData.percentage + '%' }"
        ></div>
      </div>
      <p v-if="progressData.percentage === 100" class="text-xs text-green-600 font-semibold mt-2">
        Selamat! Kamu telah menyelesaikan kursus ini.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Video Area -->
      <div class="lg:col-span-2 space-y-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h1 class="font-heading text-2xl font-bold text-gray-900">{{ data.Course?.name }}</h1>
            <p class="text-sm text-gray-500 mt-1">{{ activeVideo?.name }}</p>
          </div>
          <!-- Rating -->
          <div class="flex-shrink-0">
            <div v-if="userRating" class="text-center">
              <p class="text-xs text-gray-500 mb-1">Your rating</p>
              <StarRating :modelValue="userRating" />
            </div>
            <div v-else>
              <p class="text-xs text-gray-500 mb-1">Rate this course</p>
              <StarRating v-model="newRating" :editable="true" />
              <button v-if="newRating" @click="submitRating" class="btn-brand text-xs py-1.5 px-3 mt-2 w-full">Submit</button>
            </div>
          </div>
        </div>

        <!-- Video Player -->
        <div class="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
          <iframe
            v-if="activeSrc"
            :src="activeSrc"
            class="absolute inset-0 w-full h-full"
            frameborder="0"
            allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <div v-else class="absolute inset-0 flex items-center justify-center text-white/50 text-sm">No video available</div>
        </div>

        <!-- YouTube badge -->
        <div v-if="activeVideo?.youtubeUrl" class="flex items-center gap-2 -mt-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8z"/><polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98"/></svg>
            YouTube Video
          </span>
        </div>

        <!-- Mark Complete Button -->
        <div class="flex items-center gap-3">
          <button
            v-if="!isActiveVideoCompleted"
            @click="markComplete"
            :disabled="markingProgress"
            class="btn-brand text-sm px-5 py-2 flex items-center gap-2"
          >
            <svg v-if="markingProgress" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Tandai Selesai
          </button>
          <button
            v-else
            @click="unmarkComplete"
            :disabled="markingProgress"
            class="btn-outline text-sm px-5 py-2 flex items-center gap-2 text-green-600 border-green-300 hover:bg-green-50"
          >
            <svg v-if="markingProgress" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Selesai — Tandai Belum Selesai
          </button>
        </div>

        <!-- Description -->
        <div class="card p-5">
          <h2 class="font-heading font-semibold text-gray-900 mb-2">About this course</h2>
          <p class="text-sm text-gray-600 leading-relaxed">{{ data.Course?.description }}</p>
        </div>

        <!-- Comments -->
        <div class="card p-5">
          <h2 class="font-heading font-semibold text-gray-900 mb-4">Comments ({{ activeVideo?.Comments?.length || 0 }})</h2>

          <form @submit.prevent="submitComment" class="flex gap-3 mb-5">
            <input v-model="commentText" type="text" class="input-field text-sm flex-1" placeholder="Add a comment..." />
            <button type="submit" class="btn-primary text-sm px-4" :disabled="!commentText.trim()">Post</button>
          </form>

          <div v-if="activeVideo?.Comments?.length" class="space-y-3">
            <div v-for="c in activeVideo.Comments" :key="c.id" class="flex gap-3">
              <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-xs font-semibold text-primary-600">{{ c.User?.name[0]?.toUpperCase() }}</span>
              </div>
              <div class="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                <p class="text-xs font-semibold text-gray-700 mb-1">{{ c.User?.name }}</p>
                <p class="text-sm text-gray-600">{{ c.comment }}</p>
              </div>
            </div>
          </div>
          <p v-else class="text-sm text-gray-400 text-center py-4">No comments yet. Be the first!</p>
        </div>
      </div>

      <!-- Sidebar: Video List -->
      <div class="lg:col-span-1">
        <div class="card p-4 sticky top-24">
          <h2 class="font-heading font-semibold text-gray-900 mb-3 text-sm">Course Videos</h2>
          <div class="space-y-1.5">
            <button
              v-for="(video, i) in data.Course?.Videos" :key="video.id"
              @click="selectVideo(i)"
              :class="['w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm', activeIndex === i ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50 text-gray-700']"
            >
              <span
                v-if="completedVideoIds.includes(video.id)"
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-green-500 text-white"
                title="Selesai"
              >
                ✓
              </span>
              <span v-else class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" :class="activeIndex === i ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'">{{ i + 1 }}</span>
              <span class="truncate font-medium">{{ video.name }}</span>
            </button>
          </div>

          <RouterLink to="/my-courses" class="btn-outline w-full text-sm mt-4 text-center">← Back to My Courses</RouterLink>
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
import StarRating from '@/components/StarRating.vue'
import { videoSrc } from '@/composables/useYoutube'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const data = ref(null)
const loading = ref(true)
const activeIndex = ref(0)
const commentText = ref('')
const newRating = ref(0)
const userRating = ref(null)
const markingProgress = ref(false)

const progressData = ref({
  totalVideos: 0,
  completedCount: 0,
  percentage: 0,
  completedVideoIds: [],
  isCompleted: false,
})

const completedVideoIds = computed(() => progressData.value.completedVideoIds)

const activeVideo = computed(() => data.value?.Course?.Videos?.[activeIndex.value])
const activeSrc = computed(() => videoSrc(activeVideo.value))
const isActiveVideoCompleted = computed(() =>
  activeVideo.value ? completedVideoIds.value.includes(activeVideo.value.id) : false,
)

function selectVideo(i) {
  activeIndex.value = i
}

async function loadProgress() {
  try {
    const { data: res } = await api.get(`/public/progress/${route.params.courseId}`)
    progressData.value = res
  } catch {
    // Progress not critical; fail silently
  }
}

async function markComplete() {
  if (!activeVideo.value || markingProgress.value) return
  markingProgress.value = true
  try {
    await api.post(`/public/progress/${activeVideo.value.id}/complete`)
    await loadProgress()
    toast.success('Video ditandai selesai!')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal menandai video')
  } finally {
    markingProgress.value = false
  }
}

async function unmarkComplete() {
  if (!activeVideo.value || markingProgress.value) return
  markingProgress.value = true
  try {
    await api.delete(`/public/progress/${activeVideo.value.id}/complete`)
    await loadProgress()
    toast.info('Tanda selesai dihapus.')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal mengubah status video')
  } finally {
    markingProgress.value = false
  }
}

async function submitComment() {
  if (!commentText.value.trim()) return
  try {
    await api.post(`/public/comments/${activeVideo.value.id}`, { comment: commentText.value })
    commentText.value = ''
    await loadCourse()
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to add comment')
  }
}

async function submitRating() {
  try {
    const { data: res } = await api.post(`/public/ratings/${route.params.courseId}`, { rating: newRating.value })
    userRating.value = res.rating
    toast.success(`Rated ${res.rating}/10!`)
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to submit rating')
  }
}

async function loadCourse() {
  const { data: res } = await api.get(`/public/my-courses/${route.params.courseId}`)
  data.value = res
}

onMounted(async () => {
  try {
    await loadCourse()
    await loadProgress()
    const { data: ratingData } = await api.get(`/public/ratings/user/${route.params.courseId}`)
    if (ratingData) userRating.value = ratingData.rating
  } catch {
    toast.error('Course not found')
    router.push('/my-courses')
  } finally {
    loading.value = false
  }
})
</script>
