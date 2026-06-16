<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="font-heading font-bold text-3xl text-gray-900 mb-2">Learning Roadmaps</h1>
      <p class="text-gray-500">Structured learning paths to guide you from beginner to expert.</p>
    </div>

    <LoadingSpinner v-if="store.loading && !store.skillDomains.length" />

    <template v-else>
      <!-- Skill Domain Tabs -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          @click="selectDomain(null)"
          :class="['px-4 py-2 rounded-full text-sm font-medium border transition-all', !activeDomainId ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300']"
        >All</button>
        <button
          v-for="domain in store.skillDomains" :key="domain.id"
          @click="selectDomain(domain.id)"
          :class="['px-4 py-2 rounded-full text-sm font-medium border transition-all', activeDomainId === domain.id ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300']"
        >
          <span v-if="domain.icon" class="mr-1">{{ domain.icon }}</span>{{ domain.name }}
        </button>
      </div>

      <!-- Active Domain Info -->
      <div v-if="activeDomain" class="card p-5 mb-8 flex items-center gap-4">
        <span v-if="activeDomain.icon" class="text-4xl">{{ activeDomain.icon }}</span>
        <div>
          <h2 class="font-heading font-bold text-xl text-gray-900">{{ activeDomain.name }}</h2>
          <p v-if="activeDomain.description" class="text-gray-500 text-sm mt-1">{{ activeDomain.description }}</p>
        </div>
      </div>

      <!-- Roadmaps Grid -->
      <LoadingSpinner v-if="store.loading" />

      <div v-else-if="store.roadmaps.length === 0" class="text-center py-16">
        <div class="text-5xl mb-4">🗺️</div>
        <h3 class="font-heading font-bold text-gray-900 mb-2">No roadmaps found</h3>
        <p class="text-gray-500 text-sm">Check back later for learning paths in this domain.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <RouterLink
          v-for="roadmap in store.roadmaps" :key="roadmap.id"
          :to="{ name: 'RoadmapDetail', params: { roadmapId: roadmap.id } }"
          class="card group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
        >
          <div class="h-40 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden relative">
            <img v-if="roadmap.thumbnailUrl" :src="roadmap.thumbnailUrl" :alt="roadmap.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div v-else class="w-full h-full flex items-center justify-center text-5xl">
              {{ roadmap.SkillDomain?.icon || '🗺️' }}
            </div>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge-primary text-xs">{{ roadmap.SkillDomain?.name }}</span>
              <span :class="['text-xs font-medium px-2 py-0.5 rounded-full', difficultyClass(roadmap.difficulty)]">{{ roadmap.difficulty }}</span>
            </div>
            <h3 class="font-heading font-bold text-gray-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">{{ roadmap.title }}</h3>
            <p class="text-gray-500 text-sm line-clamp-2 flex-1">{{ roadmap.description }}</p>
            <div class="mt-4 flex items-center text-xs text-gray-400 gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              {{ roadmap.RoadmapSteps?.length ?? 0 }} steps
            </div>
          </div>
        </RouterLink>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoadmapStore } from '@/stores/roadmap'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useSeoMeta } from '@/composables/useSeoMeta'

useSeoMeta({
  title: 'Learning Roadmaps',
  description: 'Ikuti jalur belajar terstruktur di Bimble.id untuk menguasai skill teknologi dari dasar hingga mahir.',
  keywords: 'learning roadmap, jalur belajar programming, web developer roadmap',
})

const store = useRoadmapStore()
const activeDomainId = ref(null)

const activeDomain = computed(() => store.skillDomains.find(d => d.id === activeDomainId.value) ?? null)

function difficultyClass(diff) {
  return {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  }[diff] ?? 'bg-gray-100 text-gray-600'
}

async function selectDomain(id) {
  activeDomainId.value = id
  await store.fetchRoadmaps(id)
}

onMounted(async () => {
  await store.fetchSkillDomains()
  await store.fetchRoadmaps()
})
</script>
