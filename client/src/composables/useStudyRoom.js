import { ref, onUnmounted } from 'vue'
import { io } from 'socket.io-client'
import { useAuthStore } from '@/stores/auth'

export function useStudyRoom() {
  const auth = useAuthStore()
  const socket = ref(null)
  const participants = ref([])
  const timer = ref({ state: 'idle', secondsLeft: 25 * 60 })
  const messages = ref([])
  const isConnected = ref(false)
  const currentRoom = ref(null)

  const connect = (roomId) => {
    socket.value = io(`${import.meta.env.VITE_API_URL}/study`, {
      auth: { token: auth.token },
      transports: ['websocket'],
    })

    socket.value.on('connect', () => {
      isConnected.value = true
      socket.value.emit('room:join', { roomId })
      currentRoom.value = roomId
    })

    socket.value.on('disconnect', () => {
      isConnected.value = false
    })

    socket.value.on('room:state', (data) => {
      participants.value = data.participants
      timer.value = data.timer
    })

    socket.value.on('room:participants', (list) => {
      participants.value = list
    })

    socket.value.on('timer:tick', ({ secondsLeft, state }) => {
      timer.value = { secondsLeft, state }
    })

    socket.value.on('timer:phase', ({ phase, secondsLeft }) => {
      timer.value = { state: phase, secondsLeft }
    })

    socket.value.on('timer:started', () => {
      // timer already updating via tick
    })

    socket.value.on('timer:reset', ({ secondsLeft, state }) => {
      timer.value = { secondsLeft, state }
    })

    socket.value.on('chat:message', (msg) => {
      messages.value.push(msg)
      if (messages.value.length > 100) messages.value.shift()
    })
  }

  const disconnect = () => {
    if (socket.value) {
      socket.value.emit('room:leave')
      socket.value.disconnect()
      socket.value = null
    }
    isConnected.value = false
    currentRoom.value = null
  }

  const startTimer = () => socket.value?.emit('timer:start')
  const resetTimer = () => socket.value?.emit('timer:reset')
  const sendMessage = (text) => socket.value?.emit('chat:message', { text })

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  onUnmounted(disconnect)

  return {
    isConnected, participants, timer, messages, currentRoom,
    connect, disconnect, startTimer, resetTimer, sendMessage, formatTime,
  }
}
