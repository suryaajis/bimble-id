<template>
  <div class="card flex flex-col border border-amber-200">
    <div class="aspect-video bg-gray-100 overflow-hidden relative">
      <img
        v-if="course.Course?.thumbnailUrl"
        :src="course.Course.thumbnailUrl"
        :alt="course.Course?.name"
        class="w-full h-full object-cover opacity-80"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
        <svg class="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <span class="absolute top-2 left-2 badge-active bg-amber-100 text-amber-700">Menunggu Pembayaran</span>
    </div>

    <div class="p-4 flex flex-col flex-1">
      <h3 class="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
        {{ course.Course?.name }}
      </h3>
      <p class="font-heading font-bold text-lg text-primary-600 mb-1">{{ formatPrice(course.Course?.price) }}</p>
      <p class="text-xs text-gray-500 mb-3 flex-1">
        <span v-if="course.paymentMethod">Metode: {{ course.paymentMethod }} · </span>Belum dibayar
      </p>

      <div class="flex flex-col gap-2 pt-3 border-t border-gray-50">
        <RouterLink
          :to="`/buy/${course.CourseId}`"
          class="btn-brand w-full py-2 text-xs text-center"
        >
          {{ course.chargeId ? 'Bayar Ulang' : 'Lanjutkan Pembayaran' }}
        </RouterLink>
        <button
          v-if="course.chargeId"
          type="button"
          class="btn-outline w-full py-2 text-xs"
          :disabled="checking"
          @click="handleCheck"
        >
          {{ checking ? 'Mengecek...' : 'Cek Status Pembayaran' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/api'

const props = defineProps({
  course: { type: Object, required: true },
})
const emit = defineEmits(['paid'])

const toast = useToast()
const checking = ref(false)

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price || 0)
}

async function handleCheck() {
  checking.value = true
  try {
    const { data } = await api.get(`/payment/status/${props.course.id}`)
    if (data.isPaid) {
      toast.success('Pembayaran berhasil! Course sudah terbuka.')
      emit('paid', props.course.CourseId)
    } else if (data.status === 'PENDING') {
      toast.info('Pembayaran masih menunggu. Selesaikan di aplikasi pembayaranmu lalu cek lagi.')
    } else {
      toast.warning('Pembayaran belum selesai. Silakan bayar ulang.')
    }
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal mengecek status pembayaran.')
  } finally {
    checking.value = false
  }
}
</script>
