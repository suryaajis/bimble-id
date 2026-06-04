<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar Filters -->
      <aside class="lg:w-64 flex-shrink-0">
        <div class="card p-5 sticky top-24">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-heading font-bold text-gray-900">Filters</h2>
            <button @click="clearFilters" class="text-xs text-primary-600 hover:underline font-medium">Clear all</button>
          </div>

          <!-- Search -->
          <div class="mb-5">
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Search</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input v-model="filters.search" @input="debouncedFetch" type="search" class="input-field pl-9 text-sm py-2" placeholder="Course name..." />
            </div>
          </div>

          <!-- Category -->
          <div class="mb-5">
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</label>
            <div class="space-y-1.5">
              <label v-for="cat in categories" :key="cat.id" class="flex items-center gap-2.5 cursor-pointer group">
                <input type="radio" :value="cat.id" v-model="filters.categoryId" @change="fetchCourses" class="text-primary-600 focus:ring-primary-500" />
                <span class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{{ cat.name }}</span>
              </label>
            </div>
          </div>

          <!-- Difficulty -->
          <div class="mb-5">
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Difficulty</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="d in ['easy', 'medium', 'hard']" :key="d"
                @click="toggleDifficulty(d)"
                :class="['text-xs font-medium px-3 py-1.5 rounded-full border transition-all', filters.difficulty === d ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300']"
              >{{ d }}</button>
            </div>
          </div>

          <!-- Price Sort -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Sort by Price</label>
            <select v-model="filters.price" @change="fetchCourses" class="input-field text-sm py-2">
              <option value="">Default</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </aside>

      <!-- Course Grid -->
      <div class="flex-1">
        <div class="flex items-center justify-between mb-6">
          <h1 class="font-heading font-bold text-2xl text-gray-900">
            Courses
            <span v-if="totalCourses" class="text-lg font-normal text-gray-400 ml-2">({{ totalCourses }})</span>
          </h1>
        </div>

        <LoadingSpinner v-if="loading" />

        <div v-else-if="courses.length === 0" class="text-center py-16">
          <div class="text-5xl mb-4">🔍</div>
          <h3 class="font-heading font-bold text-gray-900 mb-2">No courses found</h3>
          <p class="text-gray-500 text-sm">Try adjusting your filters or search term.</p>
          <button @click="clearFilters" class="btn-primary mt-4 text-sm">Clear Filters</button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          <CourseCard v-for="course in courses" :key="course.id" :course="course" />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-8">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">← Prev</button>
          <button
            v-for="p in visiblePages" :key="p"
            @click="changePage(p)"
            :class="['px-4 py-2 rounded-lg text-sm font-medium transition-colors', p === currentPage ? 'bg-primary-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50']"
          >{{ p }}</button>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages" class="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Next →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import CourseCard from '@/components/CourseCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const route = useRoute()
const router = useRouter()

const courses = ref([])
const categories = ref([])
const totalCourses = ref(0)
const totalPages = ref(0)
const currentPage = ref(1)
const loading = ref(false)

const filters = ref({
  search: route.query.search || '',
  categoryId: route.query.categoryId || '',
  difficulty: route.query.difficulty || '',
  price: route.query.price || '',
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

async function fetchCourses() {
  loading.value = true
  try {
    const params = { page: currentPage.value, ...filters.value }
    Object.keys(params).forEach(k => !params[k] && delete params[k])
    const { data } = await api.get('/public/courses', { params })
    courses.value = data.courses
    totalCourses.value = data.totalCourses
    totalPages.value = data.totalPages
    updateQuery()
  } catch {
    courses.value = []
  } finally {
    loading.value = false
  }
}

const debouncedFetch = useDebounceFn(() => {
  currentPage.value = 1
  fetchCourses()
}, 400)

function toggleDifficulty(d) {
  filters.value.difficulty = filters.value.difficulty === d ? '' : d
  currentPage.value = 1
  fetchCourses()
}

function changePage(p) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  fetchCourses()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function clearFilters() {
  filters.value = { search: '', categoryId: '', difficulty: '', price: '' }
  currentPage.value = 1
  fetchCourses()
}

function updateQuery() {
  const query = {}
  if (filters.value.search) query.search = filters.value.search
  if (filters.value.categoryId) query.categoryId = filters.value.categoryId
  if (filters.value.difficulty) query.difficulty = filters.value.difficulty
  if (filters.value.price) query.price = filters.value.price
  if (currentPage.value > 1) query.page = currentPage.value
  router.replace({ query })
}

onMounted(async () => {
  const { data } = await api.get('/public/categories')
  categories.value = data
  await fetchCourses()
})
</script>
