<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="card p-8">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          </div>
          <h1 class="font-heading text-2xl font-bold text-gray-900 mb-1">Complete Payment</h1>
          <p class="text-gray-500 text-sm">Choose your payment method below</p>
        </div>

        <div v-if="course" class="bg-gray-50 rounded-xl p-4 mb-6">
          <p class="text-xs text-gray-500 mb-1">You are purchasing</p>
          <p class="font-semibold text-gray-900 text-sm">{{ course.name }}</p>
          <p class="font-heading font-bold text-2xl text-primary-600 mt-1">{{ formatPrice(course.price) }}</p>
        </div>

        <form @submit.prevent="handleBuy" class="space-y-4">
          <!-- Payment Method Selector -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div class="grid grid-cols-5 gap-2 mb-6">
              <button
                v-for="method in paymentMethods"
                :key="method.value"
                type="button"
                @click="selectedMethod = method.value"
                :class="[
                  'flex flex-col items-center p-3 rounded-xl border-2 transition-all',
                  selectedMethod === method.value
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <span class="text-2xl mb-1">{{ method.icon }}</span>
                <span class="text-xs font-medium text-gray-700">{{ method.label }}</span>
              </button>
            </div>
          </div>

          <!-- Phone number field (hanya untuk OVO/GoPay/DANA) -->
          <div v-if="requiresPhone">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ selectedMethod }} Phone Number</label>
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

          <!-- ShopeePay info -->
          <div v-if="selectedMethod === 'SHOPEEPAY'" class="mb-4 p-3 bg-orange-50 rounded-lg">
            <p class="text-sm text-orange-700">Push notifikasi akan dikirim ke app ShopeePay kamu</p>
          </div>

          <!-- QRIS info -->
          <div v-if="selectedMethod === 'QRIS'" class="mb-4 p-3 bg-blue-50 rounded-lg">
            <p class="text-sm text-blue-700">QR Code akan ditampilkan setelah pembayaran diinisiasi</p>
          </div>

          <!-- QR Code display setelah QRIS charge -->
          <div v-if="qrCodeUrl" class="mt-4 flex flex-col items-center">
            <p class="text-sm font-medium text-gray-700 mb-2">Scan QR Code ini untuk membayar:</p>
            <img :src="qrCodeUrl" alt="QRIS QR Code" class="w-48 h-48 border rounded-lg" />
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
import { ref, computed, onMounted } from 'vue'
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
const selectedMethod = ref('OVO')
const qrCodeUrl = ref(null)

const paymentMethods = [
  { value: 'OVO', label: 'OVO', icon: '💜', requiresPhone: true },
  { value: 'GOPAY', label: 'GoPay', icon: '💚', requiresPhone: true },
  { value: 'DANA', label: 'DANA', icon: '💙', requiresPhone: true },
  { value: 'SHOPEEPAY', label: 'ShopeePay', icon: '🧡', requiresPhone: false },
  { value: 'QRIS', label: 'QRIS', icon: '📷', requiresPhone: false },
]

const requiresPhone = computed(() => {
  const method = paymentMethods.find(m => m.value === selectedMethod.value)
  return method ? method.requiresPhone : true
})

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)
}

async function doCharge(userCourseId) {
  if (selectedMethod.value === 'QRIS') {
    const { data } = await api.post('/payment/qris/charge', { userCourseId })
    qrCodeUrl.value = data.qr_code_url
    toast.success('QRIS siap! Scan QR Code untuk menyelesaikan pembayaran.')
  } else {
    await api.post('/payment/ewallet/charge', {
      userCourseId,
      paymentMethod: selectedMethod.value,
      phoneNumber: requiresPhone.value ? `+62${phoneNumber.value}` : undefined,
    })
    toast.success(`Payment request sent! Check your ${selectedMethod.value} app.`)
    router.push('/my-courses')
  }
}

async function handleBuy() {
  loading.value = true
  error.value = ''
  qrCodeUrl.value = null
  try {
    const { data: enrollment } = await api.post(`/public/my-courses/${route.params.courseId}`)
    await doCharge(enrollment.id)
  } catch (err) {
    const msg = err.response?.data?.message || ''
    if (msg.includes('Already')) {
      try {
        const { data: existing } = await api.get(`/public/my-courses/${route.params.courseId}`)
        await doCharge(existing.id)
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
