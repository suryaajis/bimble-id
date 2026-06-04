<template>
  <div class="p-8">
    <LoadingSpinner v-if="loading" />
    <template v-else-if="course">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <RouterLink to="/admin/courses" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </RouterLink>
          <h1 class="font-heading text-xl font-bold text-gray-900">{{ course.name }}</h1>
          <span :class="course.status === 'active' ? 'badge-active' : 'badge-inactive'">{{ course.status }}</span>
        </div>
        <div class="flex gap-2">
          <RouterLink :to="`/admin/courses/${course.id}/edit`" class="btn-outline text-sm">Edit</RouterLink>
          <RouterLink :to="`/admin/courses/${course.id}/add-video`" class="btn-brand text-sm">+ Add Video</RouterLink>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-5">
          <div class="card p-5">
            <h2 class="font-heading font-semibold text-gray-900 mb-3">Course Details</h2>
            <dl class="grid grid-cols-2 gap-3 text-sm">
              <div><dt class="text-gray-500">Category</dt><dd class="font-medium text-gray-900">{{ course.Category?.name }}</dd></div>
              <div><dt class="text-gray-500">Difficulty</dt><dd><span :class="difficultyClass(course.difficulty)">{{ course.difficulty }}</span></dd></div>
              <div><dt class="text-gray-500">Price</dt><dd class="font-medium text-gray-900">{{ formatPrice(course.price) }}</dd></div>
              <div><dt class="text-gray-500">Videos</dt><dd class="font-medium text-gray-900">{{ course.Videos?.length || 0 }}</dd></div>
            </dl>
            <div class="mt-4">
              <dt class="text-gray-500 text-sm mb-1">Description</dt>
              <dd class="text-sm text-gray-700 leading-relaxed">{{ course.description }}</dd>
            </div>
          </div>

          <!-- Videos -->
          <div class="card p-5">
            <h2 class="font-heading font-semibold text-gray-900 mb-4">Videos</h2>
            <div v-if="course.Videos?.length" class="space-y-2">
              <div v-for="(video, i) in course.Videos" :key="video.id" class="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <span class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-xs font-bold text-primary-600 flex-shrink-0">{{ i + 1 }}</span>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ video.name }}</p>
                    <span v-if="video.youtubeUrl" class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 text-xs font-medium flex-shrink-0">
                      <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8z"/><polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98"/></svg>
                      YT
                    </span>
                    <span v-else class="inline-flex items-center px-1.5 py-0.5 rounded-full bg-primary-50 text-primary-500 text-xs font-medium flex-shrink-0">MP4</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <RouterLink :to="`/admin/videos/${video.id}/edit`" class="text-xs text-yellow-600 hover:underline font-medium">Edit</RouterLink>
                  <button @click="deleteVideo(video.id)" class="text-xs text-red-500 hover:underline font-medium">Delete</button>
                </div>
              </div>
            </div>
            <p v-else class="text-sm text-gray-400">No videos yet.</p>
          </div>
        </div>

        <div>
          <div v-if="course.thumbnailUrl" class="card overflow-hidden">
            <img :src="course.thumbnailUrl" :alt="course.name" class="w-full aspect-video object-cover" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const route = useRoute()
const toast = useToast()
const course = ref(null)
const loading = ref(true)

function formatPrice(p) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p)
}
function difficultyClass(d) {
  return { easy: 'badge-easy', medium: 'badge-medium', hard: 'badge-hard' }[d] ?? 'badge-easy'
}

async function deleteVideo(videoId) {
  if (!confirm('Delete this video?')) return
  try {
    await api.delete(`/admin/videos/${videoId}`)
    course.value.Videos = course.value.Videos.filter(v => v.id !== videoId)
    toast.success('Video deleted')
  } catch {
    toast.error('Failed to delete video')
  }
}

onMounted(async () => {
  try {
    const { data } = await api.get(`/admin/courses/${route.params.courseId}`)
    course.value = data
  } finally {
    loading.value = false
  }
})
</script>
