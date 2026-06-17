<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mb-8">
      <h1 class="font-heading text-3xl font-bold text-gray-900">My Courses</h1>
      <p class="text-gray-500 mt-1">Your enrolled and paid courses</p>
    </div>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <!-- Section: Menunggu Pembayaran -->
      <section v-if="pendingCourses.length > 0" class="mb-10">
        <div class="flex items-center gap-2 mb-4">
          <h2 class="font-heading text-xl font-bold text-gray-900">Menunggu Pembayaran</h2>
          <span class="badge-active bg-amber-100 text-amber-700">{{ pendingCourses.length }}</span>
        </div>
        <p class="text-gray-500 text-sm mb-4">Selesaikan pembayaran untuk membuka course berikut.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <PendingCourseCard
            v-for="pc in pendingCourses"
            :key="pc.id"
            :course="pc"
            @paid="handlePaid"
          />
        </div>
      </section>

      <!-- Empty state: tidak ada course berbayar maupun pending -->
      <div v-if="courses.length === 0 && pendingCourses.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">📚</div>
        <h2 class="font-heading font-bold text-xl text-gray-900 mb-2">No courses yet</h2>
        <p class="text-gray-500 text-sm mb-6">Purchase a course to start learning.</p>
        <RouterLink to="/courses" class="btn-brand">Browse Courses</RouterLink>
      </div>

      <!-- Section: Course berbayar -->
      <section v-if="courses.length > 0">
        <h2 v-if="pendingCourses.length > 0" class="font-heading text-xl font-bold text-gray-900 mb-4">Course Saya</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <MyCourseCard
            v-for="course in courses"
            :key="course.id"
            :course="course"
            :progress="progressMap[course.CourseId] ?? 0"
          />
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import MyCourseCard from '@/components/MyCourseCard.vue'
import PendingCourseCard from '@/components/PendingCourseCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const courses = ref([])
const pendingCourses = ref([])
const loading = ref(true)
const progressMap = ref({})
const toast = useToast()

async function fetchProgressForCourses(courseList) {
  const results = await Promise.allSettled(
    courseList.map(async (c) => {
      const { data } = await api.get(`/public/progress/${c.CourseId}`)
      return { courseId: c.CourseId, percentage: data.percentage }
    }),
  )
  const map = {}
  results.forEach((r) => {
    if (r.status === 'fulfilled') {
      map[r.value.courseId] = r.value.percentage
    }
  })
  progressMap.value = map
}

function handlePaid(courseId) {
  // Pindahkan course dari daftar pending dan muat ulang daftar berbayar
  pendingCourses.value = pendingCourses.value.filter((pc) => pc.CourseId !== courseId)
  loadCourses()
}

async function loadCourses() {
  const [paidRes, pendingRes] = await Promise.allSettled([
    api.get('/public/my-courses'),
    api.get('/public/my-courses/pending'),
  ])

  if (paidRes.status === 'fulfilled') {
    courses.value = paidRes.value.data
    if (paidRes.value.data.length > 0) {
      await fetchProgressForCourses(paidRes.value.data)
    }
  }
  if (pendingRes.status === 'fulfilled') {
    pendingCourses.value = pendingRes.value.data
  }
  if (paidRes.status === 'rejected' && pendingRes.status === 'rejected') {
    toast.error('Failed to load your courses')
  }
}

onMounted(async () => {
  try {
    await loadCourses()
  } finally {
    loading.value = false
  }
})
</script>
