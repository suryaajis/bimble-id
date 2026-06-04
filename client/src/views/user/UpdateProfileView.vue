<template>
  <div class="max-w-lg mx-auto px-4 py-16">
    <div class="card p-8">
      <h1 class="font-heading text-2xl font-bold text-gray-900 mb-6">Update Profile</h1>

      <form @submit.prevent="handleUpdate" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
          <input v-model="form.name" type="text" class="input-field" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input v-model="form.email" type="email" class="input-field" required />
        </div>

        <p v-if="error" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{{ error }}</p>

        <div class="flex gap-3 pt-2">
          <button type="submit" class="btn-primary flex-1" :disabled="loading">
            {{ loading ? 'Saving...' : 'Save Changes' }}
          </button>
          <RouterLink to="/my-courses" class="btn-outline flex-1 text-center">Cancel</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const form = ref({ name: '', email: '' })
const loading = ref(false)
const error = ref('')

async function handleUpdate() {
  loading.value = true
  error.value = ''
  try {
    await auth.updateMe(form.value)
    auth.name = form.value.name
    localStorage.setItem('user_name', form.value.name)
    toast.success('Profile updated!')
    router.push('/my-courses')
  } catch (err) {
    error.value = err.response?.data?.message || 'Update failed'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const user = await auth.fetchMe()
  form.value = { name: user.name, email: user.email }
})
</script>
