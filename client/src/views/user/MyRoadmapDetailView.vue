<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <LoadingSpinner v-if="store.loading && !store.currentMyRoadmap" />

    <template v-else-if="store.currentMyRoadmap">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <RouterLink to="/my-roadmaps" class="hover:text-primary-600 transition-colors">My Roadmaps</RouterLink>
        <span>/</span>
        <span class="text-gray-900 font-medium truncate">{{ store.currentMyRoadmap.Roadmap?.title }}</span>
      </nav>

      <!-- Progress Header -->
      <div class="card p-6 mb-8">
        <div class="flex items-start justify-between gap-4 mb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-sm text-gray-400">{{ store.currentMyRoadmap.Roadmap.SkillDomain?.icon }} {{ store.currentMyRoadmap.Roadmap.SkillDomain?.name }}</span>
              <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', statusClass(store.currentMyRoadmap.status)]">{{ store.currentMyRoadmap.status }}</span>
            </div>
            <h1 class="font-heading font-bold text-2xl text-gray-900">{{ store.currentMyRoadmap.Roadmap.title }}</h1>
          </div>
          <span class="text-3xl font-bold text-primary-600">{{ store.currentMyRoadmap.progress }}%</span>
        </div>

        <div class="w-full bg-gray-100 rounded-full h-3 mb-2">
          <div class="bg-primary-600 h-3 rounded-full transition-all duration-500" :style="{ width: store.currentMyRoadmap.progress + '%' }"></div>
        </div>
        <p class="text-sm text-gray-500">{{ completedCount }} of {{ store.currentMyRoadmap.Roadmap.RoadmapSteps?.length }} steps completed</p>
      </div>

      <!-- Steps Timeline -->
      <div class="relative">
        <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div v-for="(step, index) in store.currentMyRoadmap.Roadmap.RoadmapSteps" :key="step.id" class="relative flex gap-5 mb-6">
          <!-- Step Circle -->
          <button
            @click="toggleStep(step.id)"
            :disabled="toggling === step.id"
            :class="[
              'relative z-10 flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all',
              isCompleted(step.id) ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white border-gray-200 text-gray-400 hover:border-primary-400'
            ]"
          >
            <svg v-if="isCompleted(step.id)" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
            <span v-else class="text-sm font-bold">{{ index + 1 }}</span>
          </button>

          <!-- Step Content -->
          <div :class="['card p-5 flex-1 mb-0 transition-all', isCompleted(step.id) ? 'opacity-75' : '']">
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1">
                <h3 :class="['font-heading font-semibold mb-1 transition-colors', isCompleted(step.id) ? 'text-gray-400 line-through' : 'text-gray-900']">{{ step.title }}</h3>
                <p v-if="step.description" class="text-gray-500 text-sm mb-3">{{ step.description }}</p>

                <RouterLink
                  v-if="step.Course"
                  :to="{ name: 'CourseDetail', params: { courseId: step.Course.id } }"
                  class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                  {{ step.Course.name }}
                </RouterLink>
                <a
                  v-else-if="step.resourceUrl"
                  :href="step.resourceUrl" target="_blank" rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  Open Resource
                </a>
              </div>

              <button
                @click="toggleStep(step.id)"
                :disabled="toggling === step.id"
                :class="['text-xs font-medium px-3 py-1.5 rounded-lg border transition-all flex-shrink-0', isCompleted(step.id) ? 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500' : 'border-primary-300 text-primary-600 hover:bg-primary-50']"
              >
                {{ toggling === step.id ? '...' : isCompleted(step.id) ? 'Undo' : 'Mark Done' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Completion Banner -->
      <div v-if="store.currentMyRoadmap.status === 'completed'" class="card p-6 bg-green-50 border-green-200 text-center mt-6">
        <div class="text-4xl mb-2">🎉</div>
        <h3 class="font-heading font-bold text-green-800 text-xl mb-1">Roadmap Complete!</h3>
        <p class="text-green-700 text-sm">Congratulations on completing this learning path.</p>
      </div>
    </template>

    <div v-else class="text-center py-16">
      <div class="text-5xl mb-4">😕</div>
      <p class="text-gray-500">Roadmap not found or you're not enrolled.</p>
      <RouterLink to="/my-roadmaps" class="btn-primary mt-4">Back to My Roadmaps</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useRoadmapStore } from '@/stores/roadmap'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const toast = useToast()
const store = useRoadmapStore()
const toggling = ref(null)

const completedStepIds = computed(() => new Set(store.currentMyRoadmap?.completedStepIds ?? []))

const completedCount = computed(() => {
  const steps = store.currentMyRoadmap?.Roadmap?.RoadmapSteps ?? []
  return steps.filter(s => completedStepIds.value.has(s.id)).length
})

function isCompleted(stepId) {
  return completedStepIds.value.has(stepId)
}

function statusClass(status) {
  return status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
}

async function toggleStep(stepId) {
  toggling.value = stepId
  try {
    if (isCompleted(stepId)) {
      await store.uncompleteStep(stepId)
    } else {
      await store.completeStep(stepId)
    }
    await store.fetchMyRoadmap(route.params.roadmapId)
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to update step')
  } finally {
    toggling.value = null
  }
}

onMounted(() => store.fetchMyRoadmap(route.params.roadmapId))
</script>
