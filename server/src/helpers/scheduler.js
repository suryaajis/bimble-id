// Daily reminder menggunakan setInterval sederhana (tanpa library tambahan)
// Jalankan setiap hari pukul 08:00 WIB (01:00 UTC)

const { User } = require('../models')
const { sendReminder, sendWeeklySummary } = require('./telegram')

const isReminderTime = () => {
  const now = new Date()
  const utcHour = now.getUTCHours()
  const utcMinute = now.getUTCMinutes()
  return utcHour === 1 && utcMinute === 0 // 08:00 WIB
}

const isWeeklySummaryTime = () => {
  const now = new Date()
  const utcHour = now.getUTCHours()
  const utcDay = now.getUTCDay() // 0=Sunday
  return utcDay === 0 && utcHour === 2 // Minggu 09:00 WIB
}

const runScheduler = async () => {
  try {
    if (isReminderTime()) {
      const users = await User.findAll({
        where: { reminderEnabled: true },
        attributes: ['id', 'name', 'telegramChatId', 'reminderEnabled'],
      })
      for (const user of users) {
        await sendReminder(user)
      }
      console.log(`[Scheduler] Sent reminders to ${users.length} users`)
    }

    if (isWeeklySummaryTime()) {
      const { UserCourse, Rating, UserRoadmap } = require('../models')
      const users = await User.findAll({
        where: { telegramChatId: { [require('sequelize').Op.ne]: null } },
        attributes: ['id', 'name', 'telegramChatId'],
      })
      for (const user of users) {
        const activeCourses = await UserCourse.count({ where: { UserId: user.id, isPaid: true } })
        const ratingsGiven = await Rating.count({ where: { UserId: user.id } })
        const roadmaps = await UserRoadmap.count({ where: { UserId: user.id } })
        await sendWeeklySummary(user, { activeCourses, ratingsGiven, roadmaps })
      }
      console.log(`[Scheduler] Sent weekly summaries to ${users.length} users`)
    }
  } catch (err) {
    console.error('[Scheduler] Error:', err.message)
  }
}

const startScheduler = () => {
  // Check every minute
  setInterval(runScheduler, 60 * 1000)
  console.log('[Scheduler] Started — daily reminders at 08:00 WIB, weekly summaries on Sunday')
}

module.exports = { startScheduler }
