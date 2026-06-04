<template>
  <div class="p-8 max-w-2xl">
    <div class="flex items-center gap-3 mb-6">
      <RouterLink :to="{ name: 'AdminRoadmaps' }" class="text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </RouterLink>
      <h1 class="font-heading text-2xl font-bold text-gray-900">Edit Roadmap</h1>
    </div>

    <LoadingSpinner v-if="loading" />

    <div v-else class="card p-6">
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
          <input v-model="form.title" type="text" class="input-field" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea v-model="form.description" rows="3" class="input-field resize-none" required></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Thumbnail URL (optional)</label>
          <input v-model="form.thumbnailUrl" type="url" class="input-field" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Skill Domain</label>
            <select v-model="form.SkillDomainId" class="input-field" required>
              <option v-for="d in domains" :key="d.id" :value="d.id">{{ d.icon }} {{ d.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Difficulty</label>
            <select v-model="form.difficulty" class="input-field" required>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
        <div class="flex gap-3 pt-2">
          <button type="submit" class="btn-brand" :disabled="submitting">{{ submitting ? 'Saving...' : 'Save Changes' }}</button>
          <RouterLink :to="{ name: 'AdminRoadmaps' }" class="btn-outline">Cancel</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const domains = ref([])
const loading = ref(true)
const submitting = ref(false)
const form = reactive({ title: '', description: '', thumbnailUrl: '', SkillDomainId: '', difficulty: '' })

async function handleSubmit() {
  submitting.value = true
  try {
    await api.put(`/admin/roadmaps/${route.params.roadmapId}`, form)
    toast.success('Roadmap updated!')
    router.push({ name: 'AdminRoadmaps' })
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to update roadmap')
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  const [rRes, dRes] = await Promise.all([
    api.get(`/admin/roadmaps/${route.params.roadmapId}`),
    api.get('/admin/skill-domains'),
  ])
  const rm = rRes.data
  Object.assign(form, { title: rm.title, description: rm.description, thumbnailUrl: rm.thumbnailUrl || '', SkillDomainId: rm.SkillDomainId, difficulty: rm.difficulty })
  domains.value = dRes.data
  loading.value = false
})
</script>
