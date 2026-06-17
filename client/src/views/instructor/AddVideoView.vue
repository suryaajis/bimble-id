<template>
  <div class="p-8">
    <div class="max-w-lg">
      <div class="flex items-center gap-3 mb-6">
        <RouterLink :to="`/instructor/courses/${$route.params.courseId}`" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </RouterLink>
        <h1 class="font-heading text-2xl font-bold text-gray-900">Add Video</h1>
      </div>

      <div class="card p-6 space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Video Source</label>
          <div class="flex gap-2">
            <button
              type="button"
              @click="sourceType = 'youtube'"
              :class="['flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all flex-1 justify-center', sourceType === 'youtube' ? 'bg-red-50 border-red-300 text-red-700' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300']"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8z"/><polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98"/></svg>
              YouTube URL
            </button>
            <button
              type="button"
              @click="sourceType = 'file'"
              :class="['flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all flex-1 justify-center', sourceType === 'file' ? 'bg-primary-50 border-primary-300 text-primary-700' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300']"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
              Upload MP4
            </button>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <template v-if="sourceType === 'youtube'">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Video Name</label>
              <input v-model="videoName" type="text" class="input-field" placeholder="e.g. Introduction to Variables" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">YouTube URL</label>
              <div class="relative">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8z"/><polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98"/></svg>
                <input
                  v-model="youtubeUrl"
                  type="url"
                  class="input-field pl-10"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>
            </div>

            <div v-if="ytThumb" class="flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <img :src="ytThumb" class="w-28 h-16 object-cover rounded-lg flex-shrink-0" />
              <div>
                <p class="text-xs font-semibold text-green-600 mb-1">✓ Valid YouTube URL</p>
                <p class="text-xs text-gray-500 break-all">{{ youtubeUrl }}</p>
              </div>
            </div>
          </template>

          <template v-else>
            <div
              class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer"
              @click="$refs.fileInput.click()"
            >
              <input ref="fileInput" type="file" accept="video/mp4" class="hidden" @change="onFileChange" />
              <div v-if="videoFile">
                <svg class="w-10 h-10 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p class="text-sm font-medium text-gray-700">{{ videoFile.name }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ (videoFile.size / 1024 / 1024).toFixed(1) }} MB</p>
              </div>
              <div v-else>
                <svg class="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                <p class="text-sm text-gray-500">Click to select an MP4 file</p>
                <p class="text-xs text-gray-400 mt-1">Max 25 MB</p>
              </div>
            </div>
          </template>

          <p v-if="error" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{{ error }}</p>

          <div class="flex gap-3 pt-1">
            <button
              type="submit"
              class="btn-brand flex-1"
              :disabled="loading || (sourceType === 'file' && !videoFile) || (sourceType === 'youtube' && !youtubeUrl)"
            >
              <span v-if="loading" class="flex items-center justify-center gap-2">
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                {{ sourceType === 'file' ? 'Uploading...' : 'Adding...' }}
              </span>
              <span v-else>Add Video</span>
            </button>
            <RouterLink :to="`/instructor/courses/${$route.params.courseId}`" class="btn-outline flex-1 text-center">Cancel</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { getThumbnail } from '@/composables/useYoutube'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const sourceType = ref('youtube')
const videoName = ref('')
const youtubeUrl = ref('')
const videoFile = ref(null)
const loading = ref(false)
const error = ref('')

const ytThumb = computed(() => getThumbnail(youtubeUrl.value))

function onFileChange(e) { videoFile.value = e.target.files[0] }

async function handleSubmit() {
  loading.value = true
  error.value = ''
  try {
    if (sourceType.value === 'youtube') {
      await api.post(`/instructor/videos/${route.params.courseId}`, {
        name: videoName.value,
        youtubeUrl: youtubeUrl.value,
      })
    } else {
      const formData = new FormData()
      formData.append('Videos', videoFile.value)
      await api.post(`/instructor/videos/${route.params.courseId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }
    toast.success('Video added!')
    router.push(`/instructor/courses/${route.params.courseId}`)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to add video'
  } finally {
    loading.value = false
  }
}
</script>
