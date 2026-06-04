<template>
  <div class="p-8 max-w-3xl">
    <div class="flex items-center gap-3 mb-6">
      <RouterLink :to="{ name: 'AdminRoadmaps' }" class="text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </RouterLink>
      <h1 class="font-heading text-2xl font-bold text-gray-900 truncate">{{ roadmap?.title || 'Roadmap Detail' }}</h1>
    </div>

    <LoadingSpinner v-if="loading" />

    <template v-else-if="roadmap">
      <!-- Roadmap Info -->
      <div class="card p-5 mb-6 flex items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm text-gray-400">{{ roadmap.SkillDomain?.icon }} {{ roadmap.SkillDomain?.name }}</span>
            <span :class="['text-xs font-medium px-2 py-0.5 rounded-full', difficultyClass(roadmap.difficulty)]">{{ roadmap.difficulty }}</span>
          </div>
          <p class="text-gray-500 text-sm">{{ roadmap.description }}</p>
        </div>
        <RouterLink :to="{ name: 'UpdateRoadmap', params: { roadmapId: roadmap.id } }" class="btn-outline text-sm flex-shrink-0">Edit Info</RouterLink>
      </div>

      <!-- Steps -->
      <div class="card overflow-hidden mb-6">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 class="font-heading font-semibold text-gray-900">Steps ({{ roadmap.RoadmapSteps?.length ?? 0 }})</h2>
        </div>

        <div v-if="roadmap.RoadmapSteps?.length === 0" class="text-center py-10 text-gray-400 text-sm">
          No steps yet. Add the first step below.
        </div>

        <div v-else class="divide-y divide-gray-100">
          <div v-for="(step, index) in sortedSteps" :key="step.id" class="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
            <span class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0 mt-0.5">{{ index + 1 }}</span>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 text-sm">{{ step.title }}</p>
              <p v-if="step.description" class="text-xs text-gray-500 mt-0.5 truncate">{{ step.description }}</p>
              <p v-if="step.Course" class="text-xs text-primary-600 mt-0.5">Linked: {{ step.Course.name }}</p>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <button @click="startEditStep(step)" class="text-xs text-gray-400 hover:text-primary-500 transition-colors">Edit</button>
              <button @click="deleteStep(step)" class="text-xs text-gray-400 hover:text-red-500 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add / Edit Step Form -->
      <div class="card p-5">
        <h2 class="font-heading font-semibold text-gray-900 mb-4">{{ editingStep ? 'Edit Step' : 'Add Step' }}</h2>
        <form @submit.prevent="saveStep" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1.5">Step Title</label>
              <input v-model="stepForm.title" type="text" class="input-field text-sm" placeholder="e.g. Learn HTML Basics" required />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1.5">Order</label>
              <input v-model.number="stepForm.order" type="number" min="1" class="input-field text-sm" required />
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1.5">Description (optional)</label>
            <textarea v-model="stepForm.description" rows="2" class="input-field text-sm resize-none" placeholder="Brief description of this step"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1.5">Link to Course (optional)</label>
              <select v-model="stepForm.CourseId" class="input-field text-sm">
                <option value="">None</option>
                <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1.5">External Resource URL (optional)</label>
              <input v-model="stepForm.resourceUrl" type="url" class="input-field text-sm" placeholder="https://..." />
            </div>
          </div>
          <div class="flex gap-3">
            <button type="submit" class="btn-brand text-sm" :disabled="savingStep">{{ savingStep ? 'Saving...' : editingStep ? 'Update Step' : 'Add Step' }}</button>
            <button v-if="editingStep" type="button" @click="cancelEditStep" class="btn-outline text-sm">Cancel</button>
          </div>
        </form>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const route = useRoute()
const toast = useToast()
const roadmap = ref(null)
const courses = ref([])
const loading = ref(true)
const savingStep = ref(false)
const editingStep = ref(null)

const stepForm = reactive({ title: '', description: '', order: 1, CourseId: '', resourceUrl: '' })

const sortedSteps = computed(() => [...(roadmap.value?.RoadmapSteps ?? [])].sort((a, b) => a.order - b.order))

function difficultyClass(diff) {
  return { beginner: 'bg-green-100 text-green-700', intermediate: 'bg-yellow-100 text-yellow-700', advanced: 'bg-red-100 text-red-700' }[diff] ?? 'bg-gray-100 text-gray-600'
}

function startEditStep(step) {
  editingStep.value = step
  Object.assign(stepForm, { title: step.title, description: step.description || '', order: step.order, CourseId: step.CourseId || '', resourceUrl: step.resourceUrl || '' })
}

function cancelEditStep() {
  editingStep.value = null
  Object.assign(stepForm, { title: '', description: '', order: sortedSteps.value.length + 1, CourseId: '', resourceUrl: '' })
}

async function saveStep() {
  savingStep.value = true
  try {
    const payload = { ...stepForm, CourseId: stepForm.CourseId || null, resourceUrl: stepForm.resourceUrl || null }
    if (editingStep.value) {
      const { data } = await api.put(`/admin/roadmap-steps/${editingStep.value.id}`, payload)
      const idx = roadmap.value.RoadmapSteps.findIndex(s => s.id === editingStep.value.id)
      if (idx !== -1) roadmap.value.RoadmapSteps[idx] = { ...roadmap.value.RoadmapSteps[idx], ...data }
      toast.success('Step updated')
      cancelEditStep()
    } else {
      const { data } = await api.post(`/admin/roadmaps/${route.params.roadmapId}/steps`, payload)
      roadmap.value.RoadmapSteps.push(data)
      toast.success('Step added')
      stepForm.title = ''
      stepForm.description = ''
      stepForm.CourseId = ''
      stepForm.resourceUrl = ''
      stepForm.order = sortedSteps.value.length + 1
    }
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to save step')
  } finally {
    savingStep.value = false
  }
}

async function deleteStep(step) {
  if (!confirm(`Delete step "${step.title}"?`)) return
  try {
    await api.delete(`/admin/roadmap-steps/${step.id}`)
    roadmap.value.RoadmapSteps = roadmap.value.RoadmapSteps.filter(s => s.id !== step.id)
    toast.success('Step deleted')
  } catch {
    toast.error('Failed to delete step')
  }
}

onMounted(async () => {
  const [rRes, cRes] = await Promise.all([
    api.get(`/admin/roadmaps/${route.params.roadmapId}`),
    api.get('/public/courses'),
  ])
  roadmap.value = rRes.data
  courses.value = cRes.data.courses ?? cRes.data
  stepForm.order = (roadmap.value.RoadmapSteps?.length ?? 0) + 1
  loading.value = false
})
</script>
