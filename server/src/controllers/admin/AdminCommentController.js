const { Comment } = require('../../models')

class AdminCommentController {
  static async destroy(req, res, next) {
    try {
      const comment = await Comment.findByPk(req.params.commentId)
      if (!comment) throw { name: 'CommentNotFound' }
      await comment.destroy()
      res.json({ message: 'Comment deleted successfully' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AdminCommentController
