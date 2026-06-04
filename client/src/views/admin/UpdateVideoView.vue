<template>
  <div class="p-8">
    <div class="max-w-lg">
      <div class="flex items-center gap-3 mb-6">
        <button @click="$router.back()" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 class="font-heading text-2xl font-bold text-gray-900">Edit Video</h1>
      </div>

      <LoadingSpinner v-if="loading" />

      <div v-else class="card p-6 space-y-5">
        <!-- Source badge -->
        <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
          <template v-if="isYoutube">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8z"/><polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98"/></svg>
              YouTube Video
            </span>
            <span class="text-xs text-gray-500 truncate">{{ form.youtubeUrl }}</span>
          </template>
          <template v-else>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-medium">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
              Uploaded MP4
            </span>
          </template>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Video Name</label>
            <input v-model="form.name" type="text" class="input-field" required />
          </div>

          <!-- YouTube URL editable if source is YouTube -->
          <div v-if="isYoutube">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">YouTube URL</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8z"/><polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98"/></svg>
              <input v-model="form.youtubeUrl" type="url" class="input-field pl-10" required />
            </div>
            <!-- Thumbnail preview -->
            <div v-if="ytThumb" class="mt-2 flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <img :src="ytThumb" class="w-20 h-12 object-cover rounded" />
              <span class="text-xs text-green-600 font-medium">✓ Valid YouTube URL</span>
            </div>
          </div>

          <p v-if="error" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{{ error }}</p>

          <div class="flex gap-3">
            <button type="submit" class="btn-brand flex-1" :disabled="saving">{{ saving ? 'Saving...' : 'Save Changes' }}</button>
            <button type="button" @click="$router.back()" class="btn-outline flex-1">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { getThumbnail } from '@/composables/useYoutube'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const form = ref({ name: '', youtubeUrl: '' })
const loading = ref(true)
const saving = ref(false)
const error = ref('')

const isYoutube = computed(() => Boolean(form.value.youtubeUrl))
const ytThumb = computed(() => getThumbnail(form.value.youtubeUrl))

async function handleSubmit() {
  saving.value = true
  error.value = ''
  try {
    const payload = { name: form.value.name }
    if (isYoutube.value) payload.youtubeUrl = form.value.youtubeUrl
    await api.patch(`/admin/videos/${route.params.videoId}`, payload)
    toast.success('Video updated!')
    router.back()
  } catch (err) {
    error.value = err.response?.data?.message || 'Update failed'
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  try {
    const { data } = await api.get(`/admin/videos/${route.params.videoId}`)
    form.value = { name: data.name, youtubeUrl: data.youtubeUrl || '' }
  } finally {
    loading.value = false
  }
})
</script>
