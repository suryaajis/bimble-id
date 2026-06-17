<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span class="text-white font-heading font-bold text-xl">B</span>
        </div>
        <h1 class="font-heading text-2xl font-bold text-gray-900">Create your account</h1>
        <p class="text-gray-500 text-sm mt-1">Join thousands of learners on Bimble</p>
      </div>

      <div class="card p-8">
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">I want to</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="form.role = 'User'"
                :class="form.role === 'User' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                class="rounded-xl border-2 px-4 py-3 text-left transition"
              >
                <span class="block font-semibold text-sm">Learn</span>
                <span class="block text-xs text-gray-500 mt-0.5">Take courses</span>
              </button>
              <button
                type="button"
                @click="form.role = 'Instructor'"
                :class="form.role === 'Instructor' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                class="rounded-xl border-2 px-4 py-3 text-left transition"
              >
                <span class="block font-semibold text-sm">Teach</span>
                <span class="block text-xs text-gray-500 mt-0.5">Create & sell courses</span>
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input v-model="form.name" type="text" class="input-field" placeholder="John Doe" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input v-model="form.email" type="email" class="input-field" placeholder="you@example.com" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input v-model="form.password" type="password" class="input-field" placeholder="Min. 8 characters" minlength="8" required />
          </div>

          <p v-if="error" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{{ error }}</p>

          <button type="submit" class="btn-brand w-full py-3 text-sm" :disabled="loading">
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              Creating account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <RouterLink to="/login" class="text-primary-600 font-semibold hover:underline">Log in</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const form = ref({ name: '', email: '', password: '', role: 'User' })
const loading = ref(false)
const error = ref('')

async function handleRegister() {
  loading.value = true
  error.value = ''
  try {
    await auth.register(form.value.name, form.value.email, form.value.password, form.value.role)
    toast.success('Account created! Please log in.')
    router.push('/login')
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
