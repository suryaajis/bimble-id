const express = require('express')
const router = express.Router()
const CourseController = require('../controllers/instructor/InstructorCourseController')
const VideoController = require('../controllers/instructor/InstructorVideoController')
const DashboardController = require('../controllers/instructor/InstructorDashboardController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const { ownsCourseParam, ownsVideoParam } = require('../middlewares/courseOwnership')
const uploadImages = require('../middlewares/uploadImages')
const { upload } = require('../helpers/multer')

router.use(authentication, authorization('Instructor', 'Admin'))

router.get('/dashboard', DashboardController.stats)
router.get('/sales', DashboardController.sales)

router.get('/courses', CourseController.getAll)
router.post('/courses', upload.array('Videos', 3), uploadImages, CourseController.create)
router.get('/courses/:courseId', ownsCourseParam, CourseController.getById)
router.put('/courses/:courseId', ownsCourseParam, CourseController.update)
router.patch('/courses/:courseId/status', ownsCourseParam, CourseController.updateStatus)

router.post('/videos/:courseId', ownsCourseParam, upload.array('Videos', 1), uploadImages, VideoController.create)
router.get('/videos/:videoId', ownsVideoParam, VideoController.getById)
router.patch('/videos/:videoId', ownsVideoParam, VideoController.update)
router.delete('/videos/:videoId', ownsVideoParam, VideoController.destroy)

module.exports = router
