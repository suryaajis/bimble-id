<template>
  <nav class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-heading font-bold text-sm">B</span>
          </div>
          <span class="font-heading font-bold text-xl text-gray-900">bimble</span>
        </RouterLink>

        <div class="hidden md:flex items-center gap-1">
          <RouterLink to="/" class="nav-link" :class="{ 'nav-link-active': $route.path === '/' }">Home</RouterLink>
          <RouterLink to="/about" class="nav-link" :class="{ 'nav-link-active': $route.path === '/about' }">About</RouterLink>
          <RouterLink v-if="!auth.isAdmin" to="/articles" class="nav-link" :class="{ 'nav-link-active': $route.path.startsWith('/articles') }">Artikel</RouterLink>
          <RouterLink v-if="!auth.isAdmin && !auth.isInstructor" to="/courses" class="nav-link" :class="{ 'nav-link-active': $route.path.startsWith('/courses') }">Courses</RouterLink>
          <RouterLink v-if="!auth.isAdmin && !auth.isInstructor" to="/roadmaps" class="nav-link" :class="{ 'nav-link-active': $route.path.startsWith('/roadmaps') }">Roadmaps</RouterLink>
          <RouterLink v-if="auth.isUser" to="/my-courses" class="nav-link" :class="{ 'nav-link-active': $route.path.startsWith('/my-courses') }">My Courses</RouterLink>
          <RouterLink v-if="auth.isUser" to="/my-roadmaps" class="nav-link" :class="{ 'nav-link-active': $route.path.startsWith('/my-roadmaps') }">My Roadmaps</RouterLink>
          <RouterLink v-if="auth.isInstructor" to="/instructor" class="nav-link" :class="{ 'nav-link-active': $route.path.startsWith('/instructor') }">Instructor</RouterLink>
          <RouterLink v-if="auth.isAdmin" to="/admin" class="nav-link" :class="{ 'nav-link-active': $route.path.startsWith('/admin') }">Admin</RouterLink>
        </div>

        <div class="flex items-center gap-3">
          <template v-if="!auth.isLoggedIn">
            <RouterLink to="/login" class="btn-outline text-sm py-2 px-4">Log In</RouterLink>
            <RouterLink to="/register" class="btn-brand text-sm py-2 px-4">Get Started</RouterLink>
          </template>
          <template v-else>
            <div class="relative" ref="dropdownRef">
              <button @click="showDropdown = !showDropdown" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span class="text-primary-700 font-semibold text-sm">{{ auth.name[0]?.toUpperCase() }}</span>
                </div>
                <span class="text-sm font-medium text-gray-700 hidden sm:block">{{ auth.name }}</span>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                <RouterLink v-if="auth.isUser" to="/profile" @click="showDropdown = false" class="dropdown-item">My Profile</RouterLink>
                <RouterLink v-if="auth.isUser" to="/my-courses" @click="showDropdown = false" class="dropdown-item">My Courses</RouterLink>
                <RouterLink v-if="auth.isUser" to="/my-roadmaps" @click="showDropdown = false" class="dropdown-item">My Roadmaps</RouterLink>
                <RouterLink v-if="auth.isInstructor" to="/instructor" @click="showDropdown = false" class="dropdown-item">Instructor Dashboard</RouterLink>
                <RouterLink v-if="auth.isAdmin" to="/admin" @click="showDropdown = false" class="dropdown-item">Admin Panel</RouterLink>
                <hr class="my-1 border-gray-100" />
                <button @click="logout" class="dropdown-item text-red-600 w-full text-left">Log Out</button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()
const showDropdown = ref(false)
const dropdownRef = ref(null)

onClickOutside(dropdownRef, () => { showDropdown.value = false })

function logout() {
  auth.clearAuth()
  showDropdown.value = false
  toast.success('See you next time!')
  router.push('/')
}
</script>

<style scoped>
.nav-link {
  @apply px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors;
}
.nav-link-active {
  @apply text-primary-600 bg-primary-50 hover:bg-primary-50 hover:text-primary-600;
}
.dropdown-item {
  @apply block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer;
}
</style>
