<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="font-heading text-2xl font-bold text-gray-900">Roadmaps</h1>
      <RouterLink :to="{ name: 'AddRoadmap' }" class="btn-brand text-sm">+ Add Roadmap</RouterLink>
    </div>

    <!-- Skill Domains Panel -->
    <div class="card p-5 mb-8">
      <h2 class="font-heading font-semibold text-gray-900 mb-4">Skill Domains</h2>
      <div class="flex flex-wrap gap-3 mb-4">
        <div v-for="domain in domains" :key="domain.id" class="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl text-sm">
          <span v-if="domain.icon">{{ domain.icon }}</span>
          <span class="font-medium text-gray-800">{{ domain.name }}</span>
          <button @click="editDomain(domain)" class="text-gray-400 hover:text-primary-500 transition-colors ml-1">✏️</button>
          <button @click="deleteDomain(domain)" class="text-gray-400 hover:text-red-500 transition-colors">✕</button>
        </div>
        <button v-if="!showDomainForm" @click="showDomainForm = true" class="border-2 border-dashed border-gray-200 px-3 py-2 rounded-xl text-sm text-gray-400 hover:border-primary-300 hover:text-primary-500 transition-all">+ Add Domain</button>
      </div>

      <form v-if="showDomainForm" @submit.prevent="saveDomain" class="flex gap-2 flex-wrap">
        <input v-model="domainForm.icon" type="text" class="input-field text-sm w-20" placeholder="Icon (emoji)" maxlength="4" />
        <input v-model="domainForm.name" type="text" class="input-field text-sm flex-1 min-w-32" placeholder="Domain name" required />
        <input v-model="domainForm.description" type="text" class="input-field text-sm flex-1 min-w-40" placeholder="Description (optional)" />
        <button type="submit" class="btn-primary text-sm" :disabled="savingDomain">{{ savingDomain ? 'Saving...' : editingDomain ? 'Update' : 'Add' }}</button>
        <button type="button" @click="cancelDomainForm" class="btn-outline text-sm">Cancel</button>
      </form>
    </div>

    <!-- Roadmaps Table -->
    <div class="card overflow-hidden">
      <LoadingSpinner v-if="loading" class="p-8" />
      <div v-else-if="roadmaps.length === 0" class="text-center py-12 text-gray-400">
        No roadmaps yet. Create one to get started.
      </div>
      <table v-else class="w-full text-sm">
        <thead class="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
          <tr>
            <th class="px-5 py-3 text-left">Title</th>
            <th class="px-5 py-3 text-left">Domain</th>
            <th class="px-5 py-3 text-left">Difficulty</th>
            <th class="px-5 py-3 text-left">Steps</th>
            <th class="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="rm in roadmaps" :key="rm.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-5 py-3 font-medium text-gray-900">{{ rm.title }}</td>
            <td class="px-5 py-3 text-gray-500">{{ rm.SkillDomain?.name }}</td>
            <td class="px-5 py-3">
              <span :class="['text-xs font-medium px-2 py-0.5 rounded-full', difficultyClass(rm.difficulty)]">{{ rm.difficulty }}</span>
            </td>
            <td class="px-5 py-3 text-gray-500">{{ rm.RoadmapSteps?.length ?? 0 }}</td>
            <td class="px-5 py-3 text-right">
              <div class="flex items-center justify-end gap-2">
                <RouterLink :to="{ name: 'AdminRoadmapDetail', params: { roadmapId: rm.id } }" class="text-xs text-primary-600 hover:text-primary-800 font-medium">Manage</RouterLink>
                <RouterLink :to="{ name: 'UpdateRoadmap', params: { roadmapId: rm.id } }" class="text-xs text-gray-500 hover:text-gray-700 font-medium">Edit</RouterLink>
                <button @click="deleteRoadmap(rm)" class="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const toast = useToast()
const roadmaps = ref([])
const domains = ref([])
const loading = ref(true)
const showDomainForm = ref(false)
const savingDomain = ref(false)
const editingDomain = ref(null)
const domainForm = reactive({ name: '', description: '', icon: '' })

function difficultyClass(diff) {
  return { beginner: 'bg-green-100 text-green-700', intermediate: 'bg-yellow-100 text-yellow-700', advanced: 'bg-red-100 text-red-700' }[diff] ?? 'bg-gray-100 text-gray-600'
}

function editDomain(domain) {
  editingDomain.value = domain
  Object.assign(domainForm, { name: domain.name, description: domain.description || '', icon: domain.icon || '' })
  showDomainForm.value = true
}

function cancelDomainForm() {
  showDomainForm.value = false
  editingDomain.value = null
  Object.assign(domainForm, { name: '', description: '', icon: '' })
}

async function saveDomain() {
  savingDomain.value = true
  try {
    if (editingDomain.value) {
      const { data } = await api.put(`/admin/skill-domains/${editingDomain.value.id}`, domainForm)
      const idx = domains.value.findIndex(d => d.id === editingDomain.value.id)
      if (idx !== -1) domains.value[idx] = data
      toast.success('Domain updated')
    } else {
      const { data } = await api.post('/admin/skill-domains', domainForm)
      domains.value.push(data)
      toast.success('Domain added')
    }
    cancelDomainForm()
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to save domain')
  } finally {
    savingDomain.value = false
  }
}

async function deleteDomain(domain) {
  if (!confirm(`Delete "${domain.name}"? All associated roadmaps will be deleted.`)) return
  try {
    await api.delete(`/admin/skill-domains/${domain.id}`)
    domains.value = domains.value.filter(d => d.id !== domain.id)
    toast.success('Domain deleted')
  } catch {
    toast.error('Failed to delete domain')
  }
}

async function deleteRoadmap(rm) {
  if (!confirm(`Delete "${rm.title}"?`)) return
  try {
    await api.delete(`/admin/roadmaps/${rm.id}`)
    roadmaps.value = roadmaps.value.filter(r => r.id !== rm.id)
    toast.success('Roadmap deleted')
  } catch {
    toast.error('Failed to delete roadmap')
  }
}

onMounted(async () => {
  const [rRes, dRes] = await Promise.all([api.get('/admin/roadmaps'), api.get('/admin/skill-domains')])
  roadmaps.value = rRes.data
  domains.value = dRes.data
  loading.value = false
})
</script>
