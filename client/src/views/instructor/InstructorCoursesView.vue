<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="font-heading text-2xl font-bold text-gray-900">My Courses</h1>
      <RouterLink to="/instructor/courses/add" class="btn-brand text-sm">+ Create Course</RouterLink>
    </div>

    <!-- Search -->
    <div class="mb-5">
      <input v-model="search" @input="debouncedFetch" type="search" class="input-field max-w-xs text-sm" placeholder="Search my courses..." />
    </div>

    <LoadingSpinner v-if="loading" />

    <div v-else class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Course</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Category</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Price</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Review</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Published</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="course in courses" :key="course.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-5 py-4">
              <p class="font-medium text-gray-900 max-w-xs truncate">{{ course.name }}</p>
            </td>
            <td class="px-5 py-4 text-gray-500">{{ course.Category?.name }}</td>
            <td class="px-5 py-4 text-gray-700 font-medium">{{ formatPrice(course.price) }}</td>
            <td class="px-5 py-4"><span :class="approvalClass(course.approvalStatus)">{{ course.approvalStatus }}</span></td>
            <td class="px-5 py-4">
              <button @click="toggleStatus(course)" :class="course.status === 'active' ? 'badge-active' : 'badge-inactive'">
                {{ course.status === 'active' ? 'published' : 'hidden' }}
              </button>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-2">
                <RouterLink :to="`/instructor/courses/${course.id}`" class="text-primary-600 hover:underline text-xs font-medium">View</RouterLink>
                <RouterLink :to="`/instructor/courses/${course.id}/edit`" class="text-yellow-600 hover:underline text-xs font-medium">Edit</RouterLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="courses.length === 0" class="text-center py-12 text-gray-400 text-sm">No courses yet. Create your first course!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const courses = ref([])
const loading = ref(true)
const search = ref('')
const toast = useToast()

function formatPrice(p) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p)
}
function approvalClass(s) {
  return { pending: 'badge-pending', approved: 'badge-approved', rejected: 'badge-rejected' }[s] ?? 'badge-pending'
}

async function fetchCourses() {
  loading.value = true
  try {
    const params = {}
    if (search.value) params.search = search.value
    const { data } = await api.get('/instructor/courses', { params })
    courses.value = Array.isArray(data) ? data : data.courses || []
  } finally {
    loading.value = false
  }
}

const debouncedFetch = useDebounceFn(fetchCourses, 400)

async function toggleStatus(course) {
  const newStatus = course.status === 'active' ? 'inactive' : 'active'
  try {
    await api.patch(`/instructor/courses/${course.id}/status`, { status: newStatus })
    course.status = newStatus
    toast.success(newStatus === 'active' ? 'Course published' : 'Course hidden')
  } catch {
    toast.error('Failed to update')
  }
}

onMounted(fetchCourses)
</script>
