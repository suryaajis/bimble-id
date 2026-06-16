const { Video } = require('../../models')
const { toEmbedUrl } = require('../../helpers/youtube')

// Video management for an instructor's own courses. Ownership of the target
// course/video is enforced by the ownsCourseParam / ownsVideoParam guards,
// which attach req.course / req.video.
class InstructorVideoController {
  static async getById(req, res, next) {
    res.json(req.video)
  }

  static async create(req, res, next) {
    try {
      const course = req.course
      const { Videos, youtubeUrl, name: videoName } = req.body

      let attrs
      if (youtubeUrl) {
        attrs = { name: videoName || 'Untitled Video', youtubeUrl: toEmbedUrl(youtubeUrl), CourseId: course.id }
      } else {
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
      const video = req.video
      const updates = { name: req.body.name }
      if (req.body.youtubeUrl !== undefined) {
        updates.youtubeUrl = req.body.youtubeUrl ? toEmbedUrl(req.body.youtubeUrl) : null
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
      await req.video.destroy()
      res.json({ message: 'Video deleted successfully' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = InstructorVideoController
