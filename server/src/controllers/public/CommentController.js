const { Comment, UserCourse, Video, Course } = require('../../models')

class CommentController {
  static async addComment(req, res, next) {
    try {
      const { videoId } = req.params
      const { comment } = req.body
      const userId = req.user.id

      const video = await Video.findByPk(videoId, { include: Course })
      if (!video) throw { name: 'VideoNotFound' }

      const userCourse = await UserCourse.findOne({
        where: { CourseId: video.Course.id, UserId: userId },
      })
      if (!userCourse?.isPaid) throw { name: 'CourseNotPaid' }

      const newComment = await Comment.create({ comment, VideoId: videoId, UserId: userId })
      res.status(201).json({ id: newComment.id, comment: newComment.comment, VideoId: videoId, UserId: userId })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CommentController
