<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'

const router = useRouter()
const rooms = ref([])
const loading = ref(true)

const fetchRooms = async () => {
  try {
    const { data } = await api.get('/public/study-rooms')
    rooms.value = data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const joinRoom = (roomId) => {
  router.push(`/study-rooms/${roomId}`)
}

const createRoom = () => {
  const roomId = `general-${Date.now()}`
  router.push(`/study-rooms/${roomId}`)
}

onMounted(() => {
  fetchRooms()
  const interval = setInterval(fetchRooms, 10000) // refresh setiap 10 detik
  return () => clearInterval(interval)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="font-heading text-3xl font-bold text-gray-900">🧑‍💻 Belajar Bareng</h1>
          <p class="text-gray-500 mt-1">Bergabunglah dengan sesama pelajar dan belajar lebih produktif</p>
        </div>
        <button @click="createRoom" class="btn-brand">+ Buat Ruang</button>
      </div>

      <div v-if="loading" class="text-center py-16 text-gray-400">Memuat ruang belajar...</div>

      <div v-else>
        <!-- Active Rooms -->
        <div v-if="rooms.length > 0">
          <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Ruang Aktif ({{ rooms.length }})</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div v-for="room in rooms" :key="room.roomId"
              class="card p-5 hover:shadow-md transition-shadow cursor-pointer"
              @click="joinRoom(room.roomId)">
              <div class="flex items-start gap-3">
                <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <img v-if="room.course?.thumbnailUrl" :src="room.course.thumbnailUrl"
                    class="w-full h-full object-cover rounded-xl" />
                  <span v-else class="text-2xl">📚</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-800 truncate">{{ room.course?.name || room.roomId }}</p>
                  <div class="flex items-center gap-3 mt-1">
                    <span class="text-xs text-gray-500">
                      👥 {{ room.participantCount }} orang
                    </span>
                    <span :class="room.timerState === 'work' ? 'text-red-500' : room.timerState === 'break' ? 'text-green-500' : 'text-gray-400'"
                      class="text-xs font-medium">
                      {{ room.timerState === 'work' ? '🍅 Fokus' : room.timerState === 'break' ? '☕ Istirahat' : '⏸ Menunggu' }}
                    </span>
                  </div>
                </div>
                <span class="text-indigo-600 text-sm font-medium">Gabung →</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="card p-12 text-center mb-8">
          <div class="text-6xl mb-4">😴</div>
          <h3 class="font-heading text-xl font-bold text-gray-800 mb-2">Belum ada ruang aktif</h3>
          <p class="text-gray-500 mb-6">Jadilah yang pertama membuat ruang belajar!</p>
          <button @click="createRoom" class="btn-brand">Buat Ruang Belajar</button>
        </div>

        <!-- How it works -->
        <div class="card p-6">
          <h3 class="font-heading font-bold text-gray-900 mb-4">Cara Kerja Belajar Bareng</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="text-center p-4">
              <div class="text-3xl mb-2">🚪</div>
              <p class="font-semibold text-sm text-gray-800 mb-1">1. Gabung atau Buat Ruang</p>
              <p class="text-xs text-gray-500">Bergabung ke ruang yang ada atau buat ruang baru untuk kursus tertentu</p>
            </div>
            <div class="text-center p-4">
              <div class="text-3xl mb-2">🍅</div>
              <p class="font-semibold text-sm text-gray-800 mb-1">2. Timer Pomodoro Bersama</p>
              <p class="text-xs text-gray-500">25 menit fokus belajar, 5 menit istirahat — disinkronkan dengan semua peserta</p>
            </div>
            <div class="text-center p-4">
              <div class="text-3xl mb-2">💬</div>
              <p class="font-semibold text-sm text-gray-800 mb-1">3. Chat Ringan</p>
              <p class="text-xs text-gray-500">Obrolan singkat dengan sesama pelajar di sesi istirahat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
