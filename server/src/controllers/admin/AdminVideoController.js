const { Video, Course } = require('../../models')
const { toEmbedUrl } = require('../../helpers/youtube')

class AdminVideoController {
  static async getById(req, res, next) {
    try {
      const video = await Video.findByPk(req.params.videoId)
      if (!video) throw { name: 'VideoNotFound' }
      res.json(video)
    } catch (err) {
      next(err)
    }
  }

  static async create(req, res, next) {
    try {
      const course = await Course.findByPk(req.params.courseId)
      if (!course) throw { name: 'CourseNotFound' }

      const { Videos, youtubeUrl, name: videoName } = req.body

      let attrs
      if (youtubeUrl) {
        // YouTube URL submitted directly (JSON body)
        attrs = { name: videoName || 'Untitled Video', youtubeUrl: toEmbedUrl(youtubeUrl), CourseId: course.id }
      } else {
        // File was uploaded and processed by uploadImages middleware
        attrs = { name: Videos[0].name, videoUrl: Videos[0].videoUrl, CourseId: course.id }
      }

      const video = await Video.create(attrs)
      res.status(201).json(video)
    } catch (err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    try {
      const video = await Video.findByPk(req.params.videoId)
      if (!video) throw { name: 'VideoNotFound' }

      const updates = { name: req.body.name }
      if (req.body.youtubeUrl !== undefined) {
        updates.youtubeUrl = req.body.youtubeUrl ? toEmbedUrl(req.body.youtubeUrl) : null
        // If switching to YouTube, clear the old file URL
        if (updates.youtubeUrl) updates.videoUrl = null
      }

      await video.update(updates)
      res.json(video)
    } catch (err) {
      next(err)
    }
  }

  static async destroy(req, res, next) {
    try {
      const video = await Video.findByPk(req.params.videoId)
      if (!video) throw { name: 'VideoNotFound' }
      await video.destroy()
      res.json({ message: 'Video deleted successfully' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AdminVideoController
