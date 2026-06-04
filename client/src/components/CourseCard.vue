<template>
  <RouterLink :to="`/courses/${course.id}`" class="card group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
    <div class="aspect-video bg-gray-100 overflow-hidden">
      <img
        v-if="course.thumbnailUrl"
        :src="course.thumbnailUrl"
        :alt="course.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
        <svg class="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
      </div>
    </div>
    <div class="p-4 flex flex-col flex-1">
      <div class="flex items-center gap-2 mb-2">
        <span v-if="course.Category" class="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
          {{ course.Category.name }}
        </span>
        <span :class="difficultyClass">{{ course.difficulty }}</span>
      </div>
      <h3 class="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
        {{ course.name }}
      </h3>
      <p class="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">{{ course.description }}</p>
      <div class="flex items-center justify-between pt-3 border-t border-gray-50">
        <span class="font-bold text-gray-900 text-sm">{{ formatPrice(course.price) }}</span>
        <span class="text-xs text-brand-500 font-semibold">View →</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ course: { type: Object, required: true } })

const difficultyClass = computed(() => ({
  easy: 'badge-easy',
  medium: 'badge-medium',
  hard: 'badge-hard',
}[props.course.difficulty] ?? 'badge-easy'))

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)
}
</script>
