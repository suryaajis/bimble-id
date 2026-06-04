<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="card p-8">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          </div>
          <h1 class="font-heading text-2xl font-bold text-gray-900 mb-1">Pay with OVO</h1>
          <p class="text-gray-500 text-sm">Complete your purchase below</p>
        </div>

        <div v-if="course" class="bg-gray-50 rounded-xl p-4 mb-6">
          <p class="text-xs text-gray-500 mb-1">You are purchasing</p>
          <p class="font-semibold text-gray-900 text-sm">{{ course.name }}</p>
          <p class="font-heading font-bold text-2xl text-primary-600 mt-1">{{ formatPrice(course.price) }}</p>
        </div>

        <form @submit.prevent="handleBuy" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">OVO Phone Number</label>
            <div class="flex">
              <span class="inline-flex items-center px-3 py-2.5 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-500 text-sm">+62</span>
              <input
                v-model="phoneNumber"
                type="tel"
                class="input-field rounded-l-none"
                placeholder="812 3456 7890"
                pattern="[0-9]{9,13}"
                required
              />
            </div>
            <p class="text-xs text-gray-400 mt-1">Enter without leading 0 (e.g. 8123456789)</p>
          </div>

          <p v-if="error" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{{ error }}</p>

          <button type="submit" class="btn-brand w-full py-3 text-sm" :disabled="loading">
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              Processing...
            </span>
            <span v-else>Confirm Purchase</span>
          </button>
          <RouterLink :to="`/courses/${$route.params.courseId}`" class="btn-outline w-full py-3 text-sm text-center">Cancel</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const course = ref(null)
const phoneNumber = ref('')
const loading = ref(false)
const error = ref('')

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)
}

async function handleBuy() {
  loading.value = true
  error.value = ''
  try {
    const { data: enrollment } = await api.post(`/public/my-courses/${route.params.courseId}`)
    await api.post('/ovo/charge', {
      phoneNumber: `+62${phoneNumber.value}`,
      userCourseId: enrollment.id,
    })
    toast.success('Payment request sent! Check your OVO app.')
    router.push('/my-courses')
  } catch (err) {
    const msg = err.response?.data?.message || ''
    if (msg.includes('Already')) {
      try {
        const { data: existing } = await api.get(`/public/my-courses/${route.params.courseId}`)
        await api.post('/ovo/charge', {
          phoneNumber: `+62${phoneNumber.value}`,
          userCourseId: existing.id,
        })
        toast.success('Payment request sent! Check your OVO app.')
        router.push('/my-courses')
      } catch (innerErr) {
        error.value = innerErr.response?.data?.message || 'Payment failed.'
      }
    } else {
      error.value = msg || 'Payment failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    const { data } = await api.get(`/public/courses/${route.params.courseId}`)
    course.value = data
  } catch {
    router.push('/courses')
  }
})
</script>
