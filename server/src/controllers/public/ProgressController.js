const { UserVideoProgress, UserCourse, Video, Course } = require('../../models')

const markVideoComplete = async (req, res, next) => {
  try {
    const { videoId } = req.params
    const UserId = req.user.id

    const video = await Video.findByPk(videoId)
    if (!video) throw { name: 'VideoNotFound' }

    // Pastikan user sudah beli kursus ini
    const userCourse = await UserCourse.findOne({
      where: { UserId, CourseId: video.CourseId, isPaid: true },
    })
    if (!userCourse) throw { name: 'CourseNotPaid' }

    const [progress, created] = await UserVideoProgress.findOrCreate({
      where: { UserId, VideoId: videoId },
      defaults: { isCompleted: true, completedAt: new Date() },
    })

    if (!created && !progress.isCompleted) {
      await progress.update({ isCompleted: true, completedAt: new Date() })
    }

    res.json({ message: 'Video marked as complete', progress })
  } catch (err) {
    next(err)
  }
}

const unmarkVideoComplete = async (req, res, next) => {
  try {
    const { videoId } = req.params
    const UserId = req.user.id

    await UserVideoProgress.update(
      { isCompleted: false, completedAt: null },
      { where: { UserId, VideoId: videoId } },
    )

    res.json({ message: 'Video unmarked' })
  } catch (err) {
    next(err)
  }
}

const getCourseProgress = async (req, res, next) => {
  try {
    const { courseId } = req.params
    const UserId = req.user.id

    const userCourse = await UserCourse.findOne({
      where: { UserId, CourseId: courseId, isPaid: true },
      include: [{
        model: Course,
        include: [{ model: Video }],
      }],
    })

    if (!userCourse) throw { name: 'CourseNotFound' }

    const videoIds = userCourse.Course.Videos.map(v => v.id)
    const completed = await UserVideoProgress.findAll({
      where: { UserId, VideoId: videoIds, isCompleted: true },
    })

    const completedIds = completed.map(p => p.VideoId)
    const totalVideos = videoIds.length
    const completedCount = completedIds.length
    const percentage = totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0

    res.json({
      totalVideos,
      completedCount,
      percentage,
      completedVideoIds: completedIds,
      isCompleted: percentage === 100,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { markVideoComplete, unmarkVideoComplete, getCourseProgress }
