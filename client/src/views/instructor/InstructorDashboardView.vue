<template>
  <div class="p-8">
    <h1 class="font-heading text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="card p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">{{ stat.label }}</p>
            <p class="font-heading font-bold text-2xl text-gray-900">{{ stat.value }}</p>
          </div>
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" :class="stat.bg">{{ stat.icon }}</div>
        </div>
      </div>
    </div>

    <div class="card p-5 max-w-md">
      <h2 class="font-heading font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div class="space-y-2">
        <RouterLink to="/instructor/courses/add" class="btn-brand w-full text-sm py-2.5 justify-start gap-3"><span>➕</span> Create New Course</RouterLink>
        <RouterLink to="/instructor/courses" class="btn-outline w-full text-sm py-2.5 justify-start gap-3"><span>🎓</span> Manage My Courses</RouterLink>
        <RouterLink to="/instructor/sales" class="btn-outline w-full text-sm py-2.5 justify-start gap-3"><span>💰</span> View Sales</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'

function formatPrice(p) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p)
}

const stats = ref([
  { key: 'totalCourses', label: 'Total Courses', value: '-', icon: '🎓', bg: 'bg-primary-50' },
  { key: 'pendingCourses', label: 'Pending Review', value: '-', icon: '⏳', bg: 'bg-yellow-50' },
  { key: 'students', label: 'Students', value: '-', icon: '👥', bg: 'bg-green-50' },
  { key: 'earnings', label: 'Earnings', value: '-', icon: '💰', bg: 'bg-blue-50' },
])

onMounted(async () => {
  const { data } = await api.get('/instructor/dashboard')
  for (const s of stats.value) {
    s.value = s.key === 'earnings' ? formatPrice(data.earnings || 0) : (data[s.key] ?? 0)
  }
})
</script>
