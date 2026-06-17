<template>
  <div class="flex min-h-[calc(100vh-4rem)]">
    <!-- Sidebar -->
    <aside class="w-60 bg-gray-900 text-gray-400 flex-shrink-0">
      <div class="p-5 border-b border-gray-800">
        <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Instructor</p>
        <p class="text-sm font-medium text-white">{{ auth.name }}</p>
      </div>
      <nav class="p-3 space-y-0.5">
        <RouterLink
          v-for="item in navItems" :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
          :class="isActive(item.path) ? 'bg-primary-600 text-white' : 'hover:bg-gray-800 hover:text-white'"
        >
          <span class="text-base">{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <!-- Content -->
    <div class="flex-1 bg-gray-50 overflow-auto">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()

const navItems = [
  { path: '/instructor', label: 'Dashboard', icon: '📊' },
  { path: '/instructor/courses', label: 'My Courses', icon: '🎓' },
  { path: '/instructor/sales', label: 'Sales', icon: '💰' },
]

function isActive(path) {
  if (path === '/instructor') return route.path === '/instructor'
  return route.path.startsWith(path)
}
</script>
