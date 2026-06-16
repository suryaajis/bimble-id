<template>
  <RouterLink :to="`/my-courses/${course.CourseId}`" class="card group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
    <div class="aspect-video bg-gray-100 overflow-hidden">
      <img
        v-if="course.Course?.thumbnailUrl"
        :src="course.Course.thumbnailUrl"
        :alt="course.Course?.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
        <svg class="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
    <div class="p-4 flex flex-col flex-1">
      <h3 class="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
        {{ course.Course?.name }}
      </h3>
      <p class="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">{{ course.Course?.description }}</p>

      <!-- Progress Bar -->
      <div class="mb-3">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs text-gray-500">Progress</span>
          <span class="text-xs font-semibold" :class="progress === 100 ? 'text-green-600' : 'text-primary-600'">
            {{ progress }}%
          </span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-1.5">
          <div
            class="h-1.5 rounded-full transition-all duration-500"
            :class="progress === 100 ? 'bg-green-500' : 'bg-primary-500'"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-gray-50">
        <span v-if="progress === 100" class="badge-active bg-green-100 text-green-700">Selesai</span>
        <span v-else class="badge-active">Enrolled</span>
        <span class="text-xs text-primary-600 font-semibold">Continue →</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  course: { type: Object, required: true },
  progress: { type: Number, default: 0 },
})
</script>
