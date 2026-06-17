<template>
  <div class="p-8">
    <div class="max-w-2xl">
      <div class="flex items-center gap-3 mb-6">
        <RouterLink :to="`/instructor/courses/${$route.params.courseId}`" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </RouterLink>
        <h1 class="font-heading text-2xl font-bold text-gray-900">Edit Course</h1>
      </div>

      <p class="text-sm text-gray-500 bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3 mb-5">
        ⏳ Editing a course sends it back for review before the changes go live.
      </p>

      <LoadingSpinner v-if="loading" />

      <div v-else class="card p-6">
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
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select v-model="form.CategoryId" class="input-field" required>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Thumbnail URL</label>
              <input v-model="form.thumbnailUrl" type="url" class="input-field" required />
            </div>
          </div>

          <p v-if="error" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{{ error }}</p>

          <div class="flex gap-3 pt-2">
            <button type="submit" class="btn-brand flex-1" :disabled="saving">{{ saving ? 'Saving...' : 'Save Changes' }}</button>
            <RouterLink :to="`/instructor/courses/${$route.params.courseId}`" class="btn-outline flex-1 text-center">Cancel</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const form = ref({ name: '', description: '', price: 0, thumbnailUrl: '', difficulty: '', CategoryId: '' })
const categories = ref([])
const loading = ref(true)
const saving = ref(false)
const error = ref('')

async function handleSubmit() {
  saving.value = true
  error.value = ''
  try {
    await api.put(`/instructor/courses/${route.params.courseId}`, form.value)
    toast.success('Course updated! Pending review.')
    router.push(`/instructor/courses/${route.params.courseId}`)
  } catch (err) {
    error.value = err.response?.data?.message || 'Update failed'
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  try {
    const [courseRes, categoriesRes] = await Promise.all([
      api.get(`/instructor/courses/${route.params.courseId}`),
      api.get('/public/categories'),
    ])
    const c = courseRes.data
    form.value = { name: c.name, description: c.description, price: c.price, thumbnailUrl: c.thumbnailUrl, difficulty: c.difficulty, CategoryId: c.CategoryId }
    categories.value = categoriesRes.data
  } finally {
    loading.value = false
  }
})
</script>
