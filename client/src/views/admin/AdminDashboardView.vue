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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-5">
        <h2 class="font-heading font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div class="space-y-2">
          <RouterLink to="/admin/courses/add" class="btn-brand w-full text-sm py-2.5 justify-start gap-3"><span>➕</span> Add New Course</RouterLink>
          <RouterLink to="/admin/categories" class="btn-outline w-full text-sm py-2.5 justify-start gap-3"><span>🏷️</span> Manage Categories</RouterLink>
          <RouterLink to="/admin/users" class="btn-outline w-full text-sm py-2.5 justify-start gap-3"><span>👥</span> View All Users</RouterLink>
        </div>
      </div>
      <div class="card p-5">
        <h2 class="font-heading font-semibold text-gray-900 mb-4">Recent Courses</h2>
        <LoadingSpinner v-if="loading" />
        <div v-else class="space-y-2">
          <RouterLink v-for="c in recentCourses" :key="c.id" :to="`/admin/courses/${c.id}`" class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="text-xs font-bold text-primary-600">{{ c.name[0] }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ c.name }}</p>
              <p class="text-xs text-gray-400" :class="c.status === 'active' ? 'text-green-600' : 'text-gray-400'">{{ c.status }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const stats = ref([
  { label: 'Total Courses', value: '-', icon: '🎓', bg: 'bg-primary-50' },
  { label: 'Total Users', value: '-', icon: '👥', bg: 'bg-green-50' },
  { label: 'Categories', value: '-', icon: '🏷️', bg: 'bg-yellow-50' },
  { label: 'Active Courses', value: '-', icon: '✅', bg: 'bg-blue-50' },
])
const recentCourses = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [coursesRes, usersRes, categoriesRes] = await Promise.all([
      api.get('/admin/courses'),
      api.get('/admin/users'),
      api.get('/admin/categories'),
    ])
    const courses = Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data.courses || []
    stats.value[0].value = courses.length
    stats.value[1].value = usersRes.data.length
    stats.value[2].value = categoriesRes.data.length
    stats.value[3].value = courses.filter(c => c.status === 'active').length
    recentCourses.value = courses.slice(0, 5)
  } finally {
    loading.value = false
  }
})
</script>
