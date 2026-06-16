<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const certInfo = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const { data } = await api.get(`/public/certificates/${route.params.courseId}/info`)
    certInfo.value = data
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal memuat informasi sertifikat'
  } finally {
    loading.value = false
  }
})

const openCertificate = () => {
  const token = localStorage.getItem('access_token')
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
  const url = `${baseUrl}/public/certificates/${route.params.courseId}?access_token=${token}`
  window.open(url, '_blank')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-lg w-full text-center p-8">
      <div v-if="loading">
        <LoadingSpinner />
      </div>

      <div v-else-if="error" class="text-red-500">
        <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p class="text-gray-700 font-medium mb-2">Tidak dapat memuat sertifikat</p>
        <p class="text-sm text-gray-500 mb-6">{{ error }}</p>
        <button @click="router.back()" class="btn-outline w-full">Kembali</button>
      </div>

      <div v-else>
        <!-- Certificate Icon -->
        <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
          </svg>
        </div>

        <h1 class="font-heading text-2xl font-bold text-gray-900 mb-2">Sertifikat Kursus</h1>

        <!-- Already has certificate -->
        <div v-if="certInfo.hasCertificate">
          <p class="text-gray-500 mb-2">Sertifikat sudah diterbitkan</p>
          <p class="text-sm font-mono text-indigo-600 bg-indigo-50 px-3 py-1 rounded inline-block mb-6">
            {{ certInfo.certificate.certificateNumber }}
          </p>
          <p class="text-xs text-gray-400 mb-6">
            Diterbitkan pada {{ new Date(certInfo.certificate.issuedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
          </p>
          <div class="flex flex-col gap-3">
            <button @click="openCertificate" class="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              Lihat &amp; Print Sertifikat
            </button>
            <button @click="router.back()" class="w-full py-2.5 px-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Kembali
            </button>
          </div>
        </div>

        <!-- No certificate yet -->
        <div v-else>
          <p class="text-gray-500 mb-6">
            Sertifikat belum pernah diterbitkan untuk kursus ini. Klik tombol di bawah untuk menerbitkan sertifikat kamu.
          </p>
          <div class="flex flex-col gap-3">
            <button @click="openCertificate" class="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all">
              Terbitkan &amp; Lihat Sertifikat
            </button>
            <button @click="router.back()" class="w-full py-2.5 px-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
