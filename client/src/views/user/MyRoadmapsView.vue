<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mb-8">
      <h1 class="font-heading font-bold text-2xl text-gray-900 mb-1">My Roadmaps</h1>
      <p class="text-gray-500 text-sm">Track your learning journey across all enrolled roadmaps.</p>
    </div>

    <LoadingSpinner v-if="store.loading" />

    <div v-else-if="store.myRoadmaps.length === 0" class="text-center py-16 card">
      <div class="text-5xl mb-4">🗺️</div>
      <h3 class="font-heading font-bold text-gray-900 mb-2">No roadmaps yet</h3>
      <p class="text-gray-500 text-sm mb-4">Pick a learning path and start your journey.</p>
      <RouterLink to="/roadmaps" class="btn-primary">Browse Roadmaps</RouterLink>
    </div>

    <div v-else class="space-y-4">
      <RouterLink
        v-for="ur in store.myRoadmaps" :key="ur.id"
        :to="{ name: 'MyRoadmapDetail', params: { roadmapId: ur.RoadmapId } }"
        class="card p-5 flex items-center gap-5 hover:shadow-md transition-shadow group"
      >
        <!-- Thumbnail -->
        <div class="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex-shrink-0 overflow-hidden">
          <img v-if="ur.Roadmap.thumbnailUrl" :src="ur.Roadmap.thumbnailUrl" :alt="ur.Roadmap.title" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center text-2xl">
            {{ ur.Roadmap.SkillDomain?.icon || '🗺️' }}
          </div>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs text-gray-400">{{ ur.Roadmap.SkillDomain?.name }}</span>
            <span :class="['text-xs px-2 py-0.5 rounded-full font-medium', statusClass(ur.status)]">{{ ur.status }}</span>
          </div>
          <h3 class="font-heading font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">{{ ur.Roadmap.title }}</h3>

          <!-- Progress Bar -->
          <div class="mt-3">
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>{{ ur.progress }}% complete</span>
              <span>{{ completedCount(ur) }}/{{ ur.Roadmap.RoadmapSteps?.length }} steps</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div class="bg-primary-600 h-2 rounded-full transition-all duration-300" :style="{ width: ur.progress + '%' }"></div>
            </div>
          </div>
        </div>

        <svg class="w-5 h-5 text-gray-300 group-hover:text-primary-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoadmapStore } from '@/stores/roadmap'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const store = useRoadmapStore()

function statusClass(status) {
  return status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
}

function completedCount(ur) {
  if (!ur.completedStepIds || !ur.Roadmap?.RoadmapSteps) return 0
  return ur.Roadmap.RoadmapSteps.filter(s => ur.completedStepIds.includes(s.id)).length
}

onMounted(() => store.fetchMyRoadmaps())
</script>
