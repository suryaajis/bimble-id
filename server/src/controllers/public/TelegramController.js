const crypto = require('crypto')
const { User, TelegramConnectToken, UserCourse, Rating, UserRoadmap } = require('../../models')
const { sendMessage } = require('../../helpers/telegram')
const { Op } = require('sequelize')

// Generate token untuk connect akun
const generateConnectToken = async (req, res, next) => {
  try {
    const UserId = req.user.id
    const token = crypto.randomBytes(16).toString('hex')
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 menit

    // Hapus token lama jika ada
    await TelegramConnectToken.destroy({ where: { UserId } })

    // Buat token baru
    await TelegramConnectToken.create({ UserId, token, expiresAt })

    const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'bimbleid_bot'
    const deepLink = `https://t.me/${botUsername}?start=${token}`

    res.json({
      token,
      deepLink,
      expiresAt,
      message: 'Klik link atau kirim /start ' + token + ' ke bot @' + botUsername,
    })
  } catch (err) {
    next(err)
  }
}

// Cek status koneksi Telegram
const getTelegramStatus = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['telegramChatId', 'telegramConnectedAt', 'reminderEnabled'],
    })
    res.json({
      isConnected: !!user.telegramChatId,
      connectedAt: user.telegramConnectedAt,
      reminderEnabled: user.reminderEnabled,
    })
  } catch (err) {
    next(err)
  }
}

// Toggle reminder on/off
const toggleReminder = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    await user.update({ reminderEnabled: !user.reminderEnabled })
    res.json({
      reminderEnabled: user.reminderEnabled,
      message: user.reminderEnabled ? 'Reminder diaktifkan' : 'Reminder dimatikan',
    })
  } catch (err) {
    next(err)
  }
}

// Disconnect Telegram
const disconnectTelegram = async (req, res, next) => {
  try {
    await User.update(
      { telegramChatId: null, telegramConnectedAt: null },
      { where: { id: req.user.id } }
    )
    res.json({ message: 'Telegram berhasil di-disconnect' })
  } catch (err) {
    next(err)
  }
}

// Webhook dari Telegram Bot
const telegramWebhook = async (req, res) => {
  try {
    const update = req.body

    // Handle /start command dengan token
    if (update.message?.text?.startsWith('/start')) {
      const chatId = update.message.chat.id
      const parts = update.message.text.split(' ')
      const token = parts[1]

      if (!token) {
        await sendMessage(chatId, '👋 Halo! Untuk menghubungkan akun Bimble kamu, buka Bimble.id → Profil → Hubungkan Telegram, lalu klik link yang tersedia.')
        return res.json({ ok: true })
      }

      // Cari token yang valid
      const connectToken = await TelegramConnectToken.findOne({
        where: {
          token,
          expiresAt: { [Op.gt]: new Date() },
        },
        include: [{ model: User }],
      })

      if (!connectToken) {
        await sendMessage(chatId, '❌ Token tidak valid atau sudah kadaluarsa. Coba generate token baru di Bimble.id.')
        return res.json({ ok: true })
      }

      // Hubungkan akun
      await User.update(
        { telegramChatId: String(chatId), telegramConnectedAt: new Date() },
        { where: { id: connectToken.UserId } }
      )
      await connectToken.destroy()

      await sendMessage(chatId, `✅ <b>Berhasil terhubung!</b>

Halo, <b>${connectToken.User.name}</b>! 🎉

Akun Bimble.id kamu sudah terhubung dengan Telegram ini.

Kamu akan mendapatkan:
📚 Reminder belajar harian
📊 Ringkasan progress mingguan

Perintah yang tersedia:
/stop - Matikan reminder
/start_reminder - Aktifkan reminder kembali
/status - Cek status akun`)

      return res.json({ ok: true })
    }

    // Handle /stop
    if (update.message?.text === '/stop') {
      const chatId = update.message.chat.id
      await User.update({ reminderEnabled: false }, { where: { telegramChatId: String(chatId) } })
      await sendMessage(chatId, '🔕 Reminder dimatikan. Ketik /start_reminder untuk mengaktifkan kembali.')
      return res.json({ ok: true })
    }

    // Handle /start_reminder
    if (update.message?.text === '/start_reminder') {
      const chatId = update.message.chat.id
      await User.update({ reminderEnabled: true }, { where: { telegramChatId: String(chatId) } })
      await sendMessage(chatId, '🔔 Reminder diaktifkan! Kami akan mengingatkan kamu untuk belajar setiap hari.')
      return res.json({ ok: true })
    }

    // Handle /status
    if (update.message?.text === '/status') {
      const chatId = update.message.chat.id
      const user = await User.findOne({ where: { telegramChatId: String(chatId) } })
      if (!user) {
        await sendMessage(chatId, '❓ Akun kamu belum terhubung.')
        return res.json({ ok: true })
      }
      const courses = await UserCourse.count({ where: { UserId: user.id, isPaid: true } })
      await sendMessage(chatId, `📊 <b>Status Akun</b>

👤 Nama: <b>${user.name}</b>
🎓 Kursus: <b>${courses}</b>
🔔 Reminder: <b>${user.reminderEnabled ? 'Aktif' : 'Mati'}</b>`)
      return res.json({ ok: true })
    }

    res.json({ ok: true })
  } catch (err) {
    console.error('Telegram webhook error:', err)
    res.json({ ok: true }) // Always return ok to Telegram
  }
}

module.exports = { generateConnectToken, getTelegramStatus, toggleReminder, disconnectTelegram, telegramWebhook }
