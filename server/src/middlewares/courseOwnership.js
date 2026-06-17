const { Course, Video } = require('../models')

// Admins may manage any course; instructors only their own.
const allow = (req, course) => req.user?.role === 'Admin' || course.UserId === req.user?.id

// Guards a route param :courseId — loads the course and attaches it as req.course.
const ownsCourseParam = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.courseId)
    if (!course) throw { name: 'CourseNotFound' }
    if (!allow(req, course)) throw { name: 'Forbidden' }
    req.course = course
    next()
  } catch (err) {
    next(err)
  }
}

// Guards a route param :videoId — resolves the video's course, then checks ownership.
const ownsVideoParam = async (req, res, next) => {
  try {
    const video = await Video.findByPk(req.params.videoId)
    if (!video) throw { name: 'VideoNotFound' }
    const course = await Course.findByPk(video.CourseId)
    if (!course || !allow(req, course)) throw { name: 'Forbidden' }
    req.video = video
    req.course = course
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { ownsCourseParam, ownsVideoParam }
