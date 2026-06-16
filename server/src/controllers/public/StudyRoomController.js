const { getActiveRooms } = require('../../helpers/studyRooms')
const { Course } = require('../../models')

const listRooms = async (req, res, next) => {
  try {
    const activeRooms = getActiveRooms()

    // Enrich dengan nama kursus jika roomId adalah courseId
    const enriched = await Promise.all(
      activeRooms.map(async (room) => {
        const courseId = parseInt(room.roomId.replace('course-', ''))
        if (!isNaN(courseId)) {
          const course = await Course.findByPk(courseId, { attributes: ['id', 'name', 'thumbnailUrl'] })
          return { ...room, course: course ? { id: course.id, name: course.name, thumbnailUrl: course.thumbnailUrl } : null }
        }
        return room
      })
    )

    res.json(enriched)
  } catch (err) {
    next(err)
  }
}

module.exports = { listRooms }
