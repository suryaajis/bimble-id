<template>
  <div class="p-8">
    <h1 class="font-heading text-2xl font-bold text-gray-900 mb-6">Users</h1>

    <LoadingSpinner v-if="loading" />

    <div v-else class="card overflow-hidden">
      <div class="px-5 py-3 bg-gray-50 border-b border-gray-100">
        <input v-model="search" type="search" class="input-field max-w-xs text-sm py-2" placeholder="Search users..." />
      </div>
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Name</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Email</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Role</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Joined</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-xs font-bold text-primary-600">{{ user.name[0]?.toUpperCase() }}</span>
                </div>
                <span class="font-medium text-gray-900">{{ user.name }}</span>
              </div>
            </td>
            <td class="px-5 py-4 text-gray-500">{{ user.email }}</td>
            <td class="px-5 py-4">
              <span :class="user.role === 'Admin' ? 'badge-active' : 'badge-inactive'">{{ user.role }}</span>
            </td>
            <td class="px-5 py-4 text-gray-400">{{ formatDate(user.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="filteredUsers.length === 0" class="text-center py-12 text-gray-400 text-sm">No users found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const users = ref([])
const loading = ref(true)
const search = ref('')

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  return users.value.filter(u =>
    u.name.toLowerCase().includes(search.value.toLowerCase()) ||
    u.email.toLowerCase().includes(search.value.toLowerCase())
  )
})

function formatDate(d) {
  return new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
}

onMounted(async () => {
  const { data } = await api.get('/admin/users')
  users.value = data
  loading.value = false
})
</script>
