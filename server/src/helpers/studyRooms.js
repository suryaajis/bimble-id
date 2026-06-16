const { Server } = require('socket.io')
const { verifyToken } = require('./jwt')

// In-memory room storage (tidak perlu DB untuk real-time state)
// rooms[roomId] = { participants: Map<socketId, userInfo>, timer: { state, secondsLeft, interval } }
const rooms = new Map()

const POMODORO_WORK = 25 * 60    // 25 menit
const POMODORO_BREAK = 5 * 60    // 5 menit

const getRoomData = (roomId) => {
  const room = rooms.get(roomId)
  if (!room) return null
  return {
    roomId,
    participants: Array.from(room.participants.values()),
    timer: {
      state: room.timer.state,
      secondsLeft: room.timer.secondsLeft,
    },
  }
}

const startTimer = (io, roomId) => {
  const room = rooms.get(roomId)
  if (!room || room.timer.interval) return

  room.timer.state = 'work'
  room.timer.secondsLeft = POMODORO_WORK

  room.timer.interval = setInterval(() => {
    if (!rooms.has(roomId)) {
      clearInterval(room.timer.interval)
      return
    }

    room.timer.secondsLeft--

    if (room.timer.secondsLeft <= 0) {
      if (room.timer.state === 'work') {
        room.timer.state = 'break'
        room.timer.secondsLeft = POMODORO_BREAK
        io.to(roomId).emit('timer:phase', { phase: 'break', secondsLeft: POMODORO_BREAK })
      } else {
        room.timer.state = 'work'
        room.timer.secondsLeft = POMODORO_WORK
        io.to(roomId).emit('timer:phase', { phase: 'work', secondsLeft: POMODORO_WORK })
      }
    }

    io.to(roomId).emit('timer:tick', { secondsLeft: room.timer.secondsLeft, state: room.timer.state })
  }, 1000)
}

const stopTimer = (roomId) => {
  const room = rooms.get(roomId)
  if (!room) return
  if (room.timer.interval) {
    clearInterval(room.timer.interval)
    room.timer.interval = null
  }
  room.timer.state = 'idle'
  room.timer.secondsLeft = POMODORO_WORK
}

const initStudyRooms = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  })

  // Namespace untuk study rooms
  const studyNs = io.of('/study')

  // Auth middleware untuk socket
  studyNs.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token
      if (!token) return next(new Error('Unauthorized'))
      const user = verifyToken(token)
      socket.user = user
      next()
    } catch (err) {
      next(new Error('Invalid token'))
    }
  })

  studyNs.on('connection', (socket) => {
    console.log(`[StudyRoom] User ${socket.user.name} connected`)

    // Join room
    socket.on('room:join', ({ roomId }) => {
      if (!roomId) return

      // Buat room jika belum ada
      if (!rooms.has(roomId)) {
        rooms.set(roomId, {
          participants: new Map(),
          timer: { state: 'idle', secondsLeft: POMODORO_WORK, interval: null },
        })
      }

      const room = rooms.get(roomId)

      // Tambahkan participant
      room.participants.set(socket.id, {
        socketId: socket.id,
        name: socket.user.name,
        joinedAt: new Date().toISOString(),
      })

      socket.join(roomId)
      socket.currentRoom = roomId

      // Kirim state room saat ini ke user yang baru join
      socket.emit('room:state', getRoomData(roomId))

      // Broadcast ke semua di room bahwa ada participant baru
      studyNs.to(roomId).emit('room:participants', Array.from(room.participants.values()))

      console.log(`[StudyRoom] ${socket.user.name} joined room ${roomId} (${room.participants.size} participants)`)
    })

    // Leave room
    socket.on('room:leave', () => {
      const roomId = socket.currentRoom
      if (!roomId) return

      const room = rooms.get(roomId)
      if (room) {
        room.participants.delete(socket.id)
        socket.leave(roomId)

        if (room.participants.size === 0) {
          stopTimer(roomId)
          rooms.delete(roomId)
        } else {
          studyNs.to(roomId).emit('room:participants', Array.from(room.participants.values()))
        }
      }

      socket.currentRoom = null
    })

    // Start timer (siapa pun di room bisa start)
    socket.on('timer:start', () => {
      const roomId = socket.currentRoom
      if (!roomId) return
      const room = rooms.get(roomId)
      if (!room || room.timer.state !== 'idle') return

      startTimer(studyNs, roomId)
      studyNs.to(roomId).emit('timer:started', { startedBy: socket.user.name })
    })

    // Reset timer
    socket.on('timer:reset', () => {
      const roomId = socket.currentRoom
      if (!roomId) return
      stopTimer(roomId)
      const room = rooms.get(roomId)
      if (room) {
        studyNs.to(roomId).emit('timer:reset', { secondsLeft: POMODORO_WORK, state: 'idle' })
      }
    })

    // Chat message
    socket.on('chat:message', ({ text }) => {
      const roomId = socket.currentRoom
      if (!roomId || !text?.trim()) return

      const message = {
        id: Date.now(),
        text: text.trim().slice(0, 300),
        author: socket.user.name,
        timestamp: new Date().toISOString(),
      }

      studyNs.to(roomId).emit('chat:message', message)
    })

    // Disconnect
    socket.on('disconnect', () => {
      const roomId = socket.currentRoom
      if (roomId) {
        const room = rooms.get(roomId)
        if (room) {
          room.participants.delete(socket.id)
          if (room.participants.size === 0) {
            stopTimer(roomId)
            rooms.delete(roomId)
          } else {
            studyNs.to(roomId).emit('room:participants', Array.from(room.participants.values()))
          }
        }
      }
      console.log(`[StudyRoom] User ${socket.user.name} disconnected`)
    })
  })

  // API endpoint untuk list rooms aktif
  return io
}

const getActiveRooms = () => {
  return Array.from(rooms.entries()).map(([roomId, room]) => ({
    roomId,
    participantCount: room.participants.size,
    timerState: room.timer.state,
  }))
}

module.exports = { initStudyRooms, getActiveRooms }
