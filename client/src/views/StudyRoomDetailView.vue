<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudyRoom } from '@/composables/useStudyRoom'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const chatInput = ref('')
const chatContainer = ref(null)

const {
  isConnected, participants, timer, messages,
  connect, disconnect, startTimer, resetTimer, sendMessage, formatTime,
} = useStudyRoom()

const roomId = route.params.roomId

const timerColor = (state) => ({
  work: 'text-red-500',
  break: 'text-green-500',
  idle: 'text-gray-600',
}[state] || 'text-gray-600')

const timerBg = (state) => ({
  work: 'bg-red-50 border-red-200',
  break: 'bg-green-50 border-green-200',
  idle: 'bg-gray-50 border-gray-200',
}[state] || 'bg-gray-50 border-gray-200')

const timerLabel = (state) => ({
  work: '🍅 Waktu Fokus',
  break: '☕ Waktu Istirahat',
  idle: '⏸ Siap Mulai',
}[state] || '')

const handleSend = () => {
  if (!chatInput.value.trim()) return
  sendMessage(chatInput.value)
  chatInput.value = ''
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

watch(messages, scrollToBottom, { deep: true })

onMounted(() => {
  connect(roomId)
})

onUnmounted(() => {
  disconnect()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-5xl mx-auto px-4 py-6">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-6">
        <button @click="router.push('/study-rooms')" class="text-gray-500 hover:text-gray-700">
          ← Kembali
        </button>
        <h1 class="font-heading text-xl font-bold text-gray-900 flex-1">🧑‍💻 Ruang Belajar</h1>
        <div class="flex items-center gap-2">
          <div :class="isConnected ? 'bg-green-500' : 'bg-gray-400'" class="w-2 h-2 rounded-full"></div>
          <span class="text-sm text-gray-500">{{ isConnected ? 'Terhubung' : 'Menyambung...' }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Main: Timer + Participants -->
        <div class="lg:col-span-2 space-y-4">

          <!-- Pomodoro Timer -->
          <div :class="timerBg(timer.state)"
            class="card p-8 text-center border-2">
            <p class="text-sm font-semibold text-gray-500 mb-2">{{ timerLabel(timer.state) }}</p>
            <div :class="timerColor(timer.state)"
              class="text-7xl font-bold font-mono mb-6">
              {{ formatTime(timer.secondsLeft) }}
            </div>
            <div class="flex justify-center gap-3">
              <button v-if="timer.state === 'idle'" @click="startTimer" class="btn-brand px-8">
                Mulai Sesi
              </button>
              <button v-else @click="resetTimer" class="btn-outline">
                Reset
              </button>
            </div>
            <p v-if="timer.state === 'work'" class="text-xs text-gray-400 mt-4">
              Fokus dulu! Chat baru dibuka saat istirahat 😉
            </p>
          </div>

          <!-- Participants -->
          <div class="card p-5">
            <h3 class="font-semibold text-gray-800 mb-3">👥 Peserta ({{ participants.length }})</h3>
            <div class="flex flex-wrap gap-2">
              <div v-for="p in participants" :key="p.socketId"
                class="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full">
                <div class="w-6 h-6 bg-indigo-200 rounded-full flex items-center justify-center">
                  <span class="text-xs font-bold text-indigo-700">{{ p.name.charAt(0).toUpperCase() }}</span>
                </div>
                <span class="text-sm text-indigo-800 font-medium">
                  {{ p.name }}
                  <span v-if="p.name === auth.name" class="text-indigo-400 font-normal">(kamu)</span>
                </span>
              </div>
              <div v-if="participants.length === 0" class="text-sm text-gray-400">
                Belum ada peserta lain
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Sidebar -->
        <div class="card flex flex-col h-[500px]">
          <div class="p-4 border-b border-gray-100">
            <h3 class="font-semibold text-gray-800">💬 Obrolan</h3>
          </div>

          <!-- Messages -->
          <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-3">
            <div v-if="messages.length === 0" class="text-center text-sm text-gray-400 py-8">
              Belum ada pesan. Sapa teman belajarmu! 👋
            </div>
            <div v-for="msg in messages" :key="msg.id"
              :class="msg.author === auth.name ? 'items-end' : 'items-start'"
              class="flex flex-col gap-1">
              <span class="text-xs text-gray-400">{{ msg.author }}</span>
              <div :class="msg.author === auth.name
                  ? 'bg-indigo-500 text-white rounded-tl-2xl'
                  : 'bg-gray-100 text-gray-800 rounded-tr-2xl'"
                class="max-w-[80%] px-3 py-2 rounded-b-2xl text-sm">
                {{ msg.text }}
              </div>
            </div>
          </div>

          <!-- Input -->
          <div class="p-4 border-t border-gray-100">
            <div class="flex gap-2">
              <input v-model="chatInput"
                @keydown.enter.prevent="handleSend"
                placeholder="Ketik pesan..."
                :disabled="timer.state === 'work'"
                class="input-field flex-1 text-sm py-2"
              />
              <button @click="handleSend"
                :disabled="timer.state === 'work' || !chatInput.trim()"
                class="btn-primary px-3 py-2 text-sm disabled:opacity-50">
                Kirim
              </button>
            </div>
            <p v-if="timer.state === 'work'" class="text-xs text-orange-500 mt-1">
              Chat dinonaktifkan saat sesi fokus
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
