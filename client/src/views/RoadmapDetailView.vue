<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <LoadingSpinner v-if="store.loading" />

    <template v-else-if="store.currentRoadmap">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <RouterLink to="/roadmaps" class="hover:text-primary-600 transition-colors">Roadmaps</RouterLink>
        <span>/</span>
        <span class="text-gray-900 font-medium truncate">{{ store.currentRoadmap.title }}</span>
      </nav>

      <!-- Hero -->
      <div class="card overflow-hidden mb-8">
        <div class="h-48 bg-gradient-to-br from-primary-500 to-indigo-600 relative">
          <img v-if="store.currentRoadmap.thumbnailUrl" :src="store.currentRoadmap.thumbnailUrl" :alt="store.currentRoadmap.title" class="w-full h-full object-cover opacity-60" />
          <div class="absolute inset-0 flex items-end p-6">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-white/80 text-sm">{{ store.currentRoadmap.SkillDomain?.icon }} {{ store.currentRoadmap.SkillDomain?.name }}</span>
                <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', difficultyBadge(store.currentRoadmap.difficulty)]">{{ store.currentRoadmap.difficulty }}</span>
              </div>
              <h1 class="font-heading font-bold text-2xl text-white">{{ store.currentRoadmap.title }}</h1>
            </div>
          </div>
        </div>
        <div class="p-6">
          <p class="text-gray-600">{{ store.currentRoadmap.description }}</p>
          <div class="flex items-center gap-6 mt-4 text-sm text-gray-500">
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              {{ store.currentRoadmap.RoadmapSteps?.length }} steps
            </span>
          </div>

          <!-- Enroll / View Progress -->
          <div class="mt-5">
            <div v-if="enrolled" class="flex items-center gap-3">
              <RouterLink :to="{ name: 'MyRoadmapDetail', params: { roadmapId: store.currentRoadmap.id } }" class="btn-primary">
                View My Progress
              </RouterLink>
              <span class="text-sm text-green-600 font-medium flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                Enrolled
              </span>
            </div>
            <button v-else-if="auth.isLoggedIn && auth.isUser" @click="enrollNow" :disabled="enrolling" class="btn-primary">
              {{ enrolling ? 'Enrolling...' : 'Start This Roadmap' }}
            </button>
            <RouterLink v-else-if="!auth.isLoggedIn" to="/login" class="btn-primary">Login to Start</RouterLink>
          </div>
        </div>
      </div>

      <!-- Steps Timeline -->
      <div>
        <h2 class="font-heading font-bold text-xl text-gray-900 mb-6">Learning Path</h2>
        <div class="relative">
          <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <div v-for="(step, index) in store.currentRoadmap.RoadmapSteps" :key="step.id" class="relative flex gap-5 mb-6">
            <!-- Step Number -->
            <div class="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center font-bold text-gray-500 text-sm">
              {{ index + 1 }}
            </div>

            <!-- Step Content -->
            <div class="card p-5 flex-1 mb-0">
              <h3 class="font-heading font-semibold text-gray-900 mb-1">{{ step.title }}</h3>
              <p v-if="step.description" class="text-gray-500 text-sm mb-3">{{ step.description }}</p>

              <!-- Linked Course -->
              <RouterLink
                v-if="step.Course"
                :to="{ name: 'CourseDetail', params: { courseId: step.Course.id } }"
                class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                {{ step.Course.name }}
              </RouterLink>

              <!-- External Resource -->
              <a
                v-else-if="step.resourceUrl"
                :href="step.resourceUrl" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                Open Resource
              </a>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="text-center py-16">
      <div class="text-5xl mb-4">😕</div>
      <h3 class="font-heading font-bold text-gray-900 mb-2">Roadmap not found</h3>
      <RouterLink to="/roadmaps" class="btn-primary mt-2">Back to Roadmaps</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useRoadmapStore } from '@/stores/roadmap'
import { useAuthStore } from '@/stores/auth'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const toast = useToast()
const store = useRoadmapStore()
const auth = useAuthStore()
const enrolling = ref(false)
const enrolled = ref(false)

function difficultyBadge(diff) {
  return {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }[diff] ?? 'bg-gray-100 text-gray-700'
}

async function enrollNow() {
  enrolling.value = true
  try {
    await store.enroll(route.params.roadmapId)
    enrolled.value = true
    toast.success('Enrolled! Good luck on your learning journey.')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to enroll')
  } finally {
    enrolling.value = false
  }
}

async function checkEnrollment() {
  if (!auth.isLoggedIn || !auth.isUser) return
  try {
    await store.fetchMyRoadmap(route.params.roadmapId)
    enrolled.value = true
  } catch {
    enrolled.value = false
  }
}

onMounted(async () => {
  await store.fetchRoadmap(route.params.roadmapId)
  await checkEnrollment()
})
</script>
