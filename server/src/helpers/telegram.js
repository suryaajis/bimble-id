const axios = require('axios')

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`

const sendMessage = async (chatId, text, options = {}) => {
  try {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      ...options,
    })
  } catch (err) {
    console.error('Telegram sendMessage error:', err.response?.data || err.message)
  }
}

const sendReminder = async (user) => {
  if (!user.telegramChatId || !user.reminderEnabled) return

  const message = `📚 <b>Halo, ${user.name}!</b>

Jangan lupa belajar hari ini ya! 🎯

Masuk ke Bimble.id dan lanjutkan kursusmu. Konsistensi adalah kunci! 💪

<i>Ketik /stop untuk mematikan reminder ini.</i>`

  await sendMessage(user.telegramChatId, message)
}

const sendWeeklySummary = async (user, stats) => {
  if (!user.telegramChatId) return

  const message = `📊 <b>Ringkasan Minggu Ini - ${user.name}</b>

🎓 Kursus aktif: <b>${stats.activeCourses}</b>
⭐ Rating yang diberikan: <b>${stats.ratingsGiven}</b>
🗺️ Roadmap diikuti: <b>${stats.roadmaps}</b>

Terus semangat belajar di Bimble.id! 🚀`

  await sendMessage(user.telegramChatId, message)
}

module.exports = { sendMessage, sendReminder, sendWeeklySummary }
