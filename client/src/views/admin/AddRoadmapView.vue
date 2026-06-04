<template>
  <div class="p-8 max-w-2xl">
    <div class="flex items-center gap-3 mb-6">
      <RouterLink :to="{ name: 'AdminRoadmaps' }" class="text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </RouterLink>
      <h1 class="font-heading text-2xl font-bold text-gray-900">Add Roadmap</h1>
    </div>

    <div class="card p-6">
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
          <input v-model="form.title" type="text" class="input-field" placeholder="e.g. Frontend Developer Roadmap" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea v-model="form.description" rows="3" class="input-field resize-none" placeholder="What will learners achieve?" required></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Thumbnail URL (optional)</label>
          <input v-model="form.thumbnailUrl" type="url" class="input-field" placeholder="https://..." />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Skill Domain</label>
            <select v-model="form.SkillDomainId" class="input-field" required>
              <option value="">Select domain</option>
              <option v-for="d in domains" :key="d.id" :value="d.id">{{ d.icon }} {{ d.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Difficulty</label>
            <select v-model="form.difficulty" class="input-field" required>
              <option value="">Select difficulty</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 pt-2">
          <button type="submit" class="btn-brand" :disabled="submitting">{{ submitting ? 'Creating...' : 'Create Roadmap' }}</button>
          <RouterLink :to="{ name: 'AdminRoadmaps' }" class="btn-outline">Cancel</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '@/api'

const router = useRouter()
const toast = useToast()
const domains = ref([])
const submitting = ref(false)
const form = reactive({ title: '', description: '', thumbnailUrl: '', SkillDomainId: '', difficulty: '' })

async function handleSubmit() {
  submitting.value = true
  try {
    const payload = { ...form }
    if (!payload.thumbnailUrl) delete payload.thumbnailUrl
    const { data } = await api.post('/admin/roadmaps', payload)
    toast.success('Roadmap created!')
    router.push({ name: 'AdminRoadmapDetail', params: { roadmapId: data.id } })
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to create roadmap')
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  const { data } = await api.get('/admin/skill-domains')
  domains.value = data
})
</script>
