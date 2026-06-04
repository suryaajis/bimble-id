<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mb-8">
      <h1 class="font-heading text-3xl font-bold text-gray-900">My Courses</h1>
      <p class="text-gray-500 mt-1">Your enrolled and paid courses</p>
    </div>

    <LoadingSpinner v-if="loading" />

    <div v-else-if="courses.length === 0" class="text-center py-20">
      <div class="text-6xl mb-4">📚</div>
      <h2 class="font-heading font-bold text-xl text-gray-900 mb-2">No courses yet</h2>
      <p class="text-gray-500 text-sm mb-6">Purchase a course to start learning.</p>
      <RouterLink to="/courses" class="btn-brand">Browse Courses</RouterLink>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <MyCourseCard v-for="course in courses" :key="course.id" :course="course" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import MyCourseCard from '@/components/MyCourseCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const courses = ref([])
const loading = ref(true)
const toast = useToast()

onMounted(async () => {
  try {
    const { data } = await api.get('/public/my-courses')
    courses.value = data
  } catch {
    toast.error('Failed to load your courses')
  } finally {
    loading.value = false
  }
})
</script>
