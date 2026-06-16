<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="font-heading text-2xl font-bold text-gray-900">Courses</h1>
      <RouterLink to="/admin/courses/add" class="btn-brand text-sm">+ Add Course</RouterLink>
    </div>

    <!-- Filters -->
    <div class="mb-5 flex flex-wrap items-center gap-3">
      <input v-model="search" @input="debouncedFetch" type="search" class="input-field max-w-xs text-sm" placeholder="Search courses..." />
      <select v-model="approval" @change="fetchCourses" class="input-field max-w-[180px] text-sm">
        <option value="">All review states</option>
        <option value="pending">Pending review</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    <LoadingSpinner v-if="loading" />

    <div v-else class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Course</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Instructor</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Price</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Review</th>
            <th class="text-left px-5 py-3 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="course in courses" :key="course.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-5 py-4">
              <p class="font-medium text-gray-900 max-w-xs truncate">{{ course.name }}</p>
              <p class="text-xs text-gray-400">{{ course.Category?.name }}</p>
            </td>
            <td class="px-5 py-4 text-gray-500">{{ course.Instructor?.name || '—' }}</td>
            <td class="px-5 py-4 text-gray-700 font-medium">{{ formatPrice(course.price) }}</td>
            <td class="px-5 py-4">
              <button @click="toggleStatus(course)" :class="course.status === 'active' ? 'badge-active' : 'badge-inactive'">
                {{ course.status }}
              </button>
            </td>
            <td class="px-5 py-4">
              <span :class="approvalClass(course.approvalStatus)">{{ course.approvalStatus }}</span>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-2">
                <template v-if="course.approvalStatus === 'pending'">
                  <button @click="setApproval(course, 'approved')" class="text-green-600 hover:underline text-xs font-medium">Approve</button>
                  <button @click="setApproval(course, 'rejected')" class="text-red-500 hover:underline text-xs font-medium">Reject</button>
                </template>
                <RouterLink :to="`/admin/courses/${course.id}`" class="text-primary-600 hover:underline text-xs font-medium">View</RouterLink>
                <RouterLink :to="`/admin/courses/${course.id}/edit`" class="text-yellow-600 hover:underline text-xs font-medium">Edit</RouterLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="courses.length === 0" class="text-center py-12 text-gray-400 text-sm">No courses found.</div>
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
const approval = ref('')
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
    if (approval.value) params.approval = approval.value
    const { data } = await api.get('/admin/courses', { params })
    courses.value = Array.isArray(data) ? data : data.courses || []
  } finally {
    loading.value = false
  }
}

async function setApproval(course, approvalStatus) {
  try {
    await api.patch(`/admin/courses/${course.id}/approval`, { approvalStatus })
    course.approvalStatus = approvalStatus
    toast.success(`Course ${approvalStatus}`)
  } catch {
    toast.error('Failed to update review status')
  }
}

const debouncedFetch = useDebounceFn(fetchCourses, 400)

async function toggleStatus(course) {
  const newStatus = course.status === 'active' ? 'inactive' : 'active'
  try {
    await api.patch(`/admin/courses/${course.id}/status`, { status: newStatus })
    course.status = newStatus
    toast.success(`Course ${newStatus}`)
  } catch {
    toast.error('Failed to update status')
  }
}

onMounted(fetchCourses)
</script>
