<template>
  <div class="p-8">
    <div class="max-w-2xl">
      <div class="flex items-center gap-3 mb-6">
        <RouterLink to="/admin/courses" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </RouterLink>
        <h1 class="font-heading text-2xl font-bold text-gray-900">Add New Course</h1>
      </div>

      <div class="card p-6">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Course Name</label>
              <input v-model="form.name" type="text" class="input-field" required />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea v-model="form.description" class="input-field min-h-[100px] resize-none" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Price (IDR)</label>
              <input v-model.number="form.price" type="number" min="0" class="input-field" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Difficulty</label>
              <select v-model="form.difficulty" class="input-field" required>
                <option value="">Select...</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select v-model="form.CategoryId" class="input-field" required>
                <option value="">Select...</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Thumbnail URL</label>
              <input v-model="form.thumbnailUrl" type="url" class="input-field" required />
            </div>
          </div>

          <!-- Videos Section -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="block text-sm font-medium text-gray-700">Videos <span class="text-gray-400 font-normal">(up to 3)</span></label>
              <button
                v-if="videoSlots.length < 3"
                type="button"
                @click="addSlot"
                class="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >+ Add video</button>
            </div>

            <div class="space-y-4">
              <div
                v-for="(slot, i) in videoSlots"
                :key="i"
                class="border border-gray-200 rounded-xl p-4 space-y-3"
              >
                <!-- Slot header -->
                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-gray-700">Video {{ i + 1 }}</span>
                  <button v-if="videoSlots.length > 1" type="button" @click="removeSlot(i)" class="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
                </div>

                <!-- Type toggle -->
                <div class="flex gap-2">
                  <button
                    type="button"
                    @click="slot.type = 'youtube'"
                    :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all', slot.type === 'youtube' ? 'bg-red-50 border-red-300 text-red-700' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300']"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8z"/><polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98"/></svg>
                    YouTube URL
                  </button>
                  <button
                    type="button"
                    @click="slot.type = 'file'"
                    :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all', slot.type === 'file' ? 'bg-primary-50 border-primary-300 text-primary-700' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300']"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                    Upload MP4
                  </button>
                </div>

                <!-- YouTube URL input -->
                <template v-if="slot.type === 'youtube'">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Video Name</label>
                    <input v-model="slot.name" type="text" class="input-field text-sm py-2" placeholder="e.g. Introduction" required />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">YouTube URL</label>
                    <div class="relative">
                      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8z"/><polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98"/></svg>
                      <input
                        v-model="slot.youtubeUrl"
                        type="url"
                        class="input-field pl-10 text-sm py-2"
                        placeholder="https://www.youtube.com/watch?v=..."
                        required
                      />
                    </div>
                    <!-- Live thumbnail preview -->
                    <div v-if="getThumb(slot.youtubeUrl)" class="mt-2 flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <img :src="getThumb(slot.youtubeUrl)" class="w-20 h-12 object-cover rounded" />
                      <span class="text-xs text-green-600 font-medium">✓ Valid YouTube URL</span>
                    </div>
                  </div>
                </template>

                <!-- MP4 file upload -->
                <template v-else>
                  <div
                    class="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-primary-300 transition-colors cursor-pointer"
                    @click="$refs[`fileInput${i}`][0].click()"
                  >
                    <input
                      :ref="`fileInput${i}`"
                      type="file"
                      accept="video/mp4"
                      class="hidden"
                      @change="(e) => onFileChange(e, i)"
                    />
                    <div v-if="slot.file">
                      <svg class="w-8 h-8 text-green-500 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <p class="text-sm font-medium text-gray-700">{{ slot.file.name }}</p>
                      <p class="text-xs text-gray-400 mt-0.5">{{ (slot.file.size / 1024 / 1024).toFixed(1) }} MB</p>
                    </div>
                    <div v-else>
                      <svg class="w-8 h-8 text-gray-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                      <p class="text-xs text-gray-500">Click to select MP4 · Max 25 MB</p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <p v-if="error" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{{ error }}</p>

          <div class="flex gap-3 pt-2">
            <button type="submit" class="btn-brand flex-1" :disabled="loading">
              <span v-if="loading" class="flex items-center justify-center gap-2">
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Creating...
              </span>
              <span v-else>Create Course</span>
            </button>
            <RouterLink to="/admin/courses" class="btn-outline flex-1 text-center">Cancel</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { getThumbnail } from '@/composables/useYoutube'
import api from '@/api'

const router = useRouter()
const toast = useToast()

const form = ref({ name: '', description: '', price: 0, thumbnailUrl: '', difficulty: '', CategoryId: '' })
const categories = ref([])
const loading = ref(false)
const error = ref('')

const videoSlots = ref([{ type: 'youtube', name: '', youtubeUrl: '', file: null }])

function addSlot() {
  if (videoSlots.value.length < 3) {
    videoSlots.value.push({ type: 'youtube', name: '', youtubeUrl: '', file: null })
  }
}
function removeSlot(i) { videoSlots.value.splice(i, 1) }
function onFileChange(e, i) { videoSlots.value[i].file = e.target.files[0] }
function getThumb(url) { return getThumbnail(url) }

async function handleSubmit() {
  loading.value = true
  error.value = ''
  try {
    const hasFiles = videoSlots.value.some(s => s.type === 'file' && s.file)

    if (hasFiles) {
      // FormData path — mix of uploads + YouTube slots
      const formData = new FormData()
      Object.entries(form.value).forEach(([k, v]) => formData.append(k, v))

      const ytSlots = videoSlots.value.filter(s => s.type === 'youtube' && s.youtubeUrl)
      if (ytSlots.length) {
        formData.append('youtubeVideos', JSON.stringify(ytSlots.map(s => ({ name: s.name, youtubeUrl: s.youtubeUrl }))))
      }
      videoSlots.value.filter(s => s.type === 'file' && s.file).forEach(s => formData.append('Videos', s.file))

      await api.post('/admin/courses', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    } else {
      // Pure JSON — all YouTube slots
      const Videos = videoSlots.value
        .filter(s => s.type === 'youtube' && s.youtubeUrl)
        .map(s => ({ name: s.name, youtubeUrl: s.youtubeUrl }))

      await api.post('/admin/courses', { ...form.value, youtubeVideos: JSON.stringify(Videos) })
    }

    toast.success('Course created!')
    router.push('/admin/courses')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to create course'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const { data } = await api.get('/admin/categories')
  categories.value = data
})
</script>
