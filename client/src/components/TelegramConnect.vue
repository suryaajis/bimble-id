<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'
import { useToast } from 'vue-toastification'

const toast = useToast()
const status = ref(null)
const loading = ref(true)
const connectData = ref(null)
const connecting = ref(false)

const fetchStatus = async () => {
  try {
    const { data } = await api.get('/public/telegram/status')
    status.value = data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const generateToken = async () => {
  connecting.value = true
  try {
    const { data } = await api.post('/public/telegram/connect-token')
    connectData.value = data
  } catch (err) {
    toast.error('Gagal membuat token')
  } finally {
    connecting.value = false
  }
}

const toggleReminder = async () => {
  try {
    const { data } = await api.patch('/public/telegram/reminder')
    status.value.reminderEnabled = data.reminderEnabled
    toast.success(data.message)
  } catch (err) {
    toast.error('Gagal mengubah setting reminder')
  }
}

const disconnect = async () => {
  if (!confirm('Yakin ingin memutus koneksi Telegram?')) return
  try {
    await api.delete('/public/telegram/disconnect')
    status.value = { isConnected: false, reminderEnabled: true }
    connectData.value = null
    toast.success('Telegram berhasil di-disconnect')
  } catch (err) {
    toast.error('Gagal memutus koneksi')
  }
}

const copyDeepLink = async () => {
  if (connectData.value?.deepLink) {
    await navigator.clipboard.writeText(connectData.value.deepLink)
    toast.success('Link disalin!')
  }
}

onMounted(fetchStatus)
</script>

<template>
  <div class="card p-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">✈️</div>
      <div>
        <h3 class="font-heading font-bold text-gray-900">Telegram Bot</h3>
        <p class="text-sm text-gray-500">Reminder belajar harian via Telegram</p>
      </div>
    </div>

    <div v-if="loading" class="text-center py-4 text-gray-400">Memuat...</div>

    <!-- Connected State -->
    <div v-else-if="status?.isConnected">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
        <span class="text-sm font-medium text-green-700">Terhubung</span>
        <span class="text-xs text-gray-400 ml-auto">sejak {{ new Date(status.connectedAt).toLocaleDateString('id-ID') }}</span>
      </div>

      <div class="space-y-2">
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span class="text-sm text-gray-700">🔔 Reminder Harian</span>
          <button @click="toggleReminder"
            :class="status.reminderEnabled ? 'bg-indigo-600' : 'bg-gray-300'"
            class="relative w-10 h-5 rounded-full transition-colors">
            <span :class="status.reminderEnabled ? 'translate-x-5' : 'translate-x-0'"
              class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform block"></span>
          </button>
        </div>
        <button @click="disconnect" class="btn-danger w-full text-sm">Putus Koneksi</button>
      </div>
    </div>

    <!-- Disconnected State -->
    <div v-else>
      <p class="text-sm text-gray-600 mb-4">Hubungkan akun Telegram kamu untuk mendapatkan reminder belajar setiap hari pukul 08.00 WIB.</p>

      <div v-if="!connectData">
        <button @click="generateToken" :disabled="connecting" class="btn-primary w-full">
          {{ connecting ? 'Membuat token...' : 'Hubungkan Telegram' }}
        </button>
      </div>

      <div v-else class="space-y-3">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p class="text-sm font-medium text-blue-800 mb-2">Cara menghubungkan:</p>
          <ol class="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Buka link di bawah ini</li>
            <li>Klik "Start" di Telegram</li>
            <li>Akun otomatis terhubung ✓</li>
          </ol>
        </div>
        <a :href="connectData.deepLink" target="_blank" class="btn-primary w-full block text-center">
          Buka di Telegram
        </a>
        <button @click="copyDeepLink" class="btn-outline w-full text-sm">Salin Link</button>
        <p class="text-xs text-gray-400 text-center">
          Token berlaku 10 menit. <button @click="connectData = null" class="text-indigo-500 hover:underline">Batal</button>
        </p>
      </div>
    </div>
  </div>
</template>
