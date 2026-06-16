const express = require('express')
const router = express.Router()
const UserController = require('../controllers/public/UserController')
const CourseController = require('../controllers/public/CourseController')
const UserCourseController = require('../controllers/public/UserCourseController')
const CommentController = require('../controllers/public/CommentController')
const RatingController = require('../controllers/public/RatingController')
const RoadmapController = require('../controllers/public/RoadmapController')
const TelegramController = require('../controllers/public/TelegramController')
const authentication = require('../middlewares/authentication')
const ratingAuthorization = require('../middlewares/ratingAuthorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-login', UserController.googleLogin)

router.get('/courses', CourseController.getAll)
router.get('/courses/:courseId', CourseController.getById)
router.get('/categories', CourseController.getCategories)
router.get('/ratings/:courseId', RatingController.getCourseRating)

router.get('/skill-domains', RoadmapController.getSkillDomains)
router.get('/roadmaps', RoadmapController.getAll)
router.get('/roadmaps/:roadmapId', RoadmapController.getById)

router.use(authentication)

router.get('/me', UserController.getMe)
router.put('/me', UserController.updateMe)

router.get('/my-courses', UserCourseController.getAll)
router.get('/my-courses/:courseId', UserCourseController.getById)
router.post('/my-courses/:courseId', UserCourseController.enroll)

router.post('/comments/:videoId', CommentController.addComment)

router.get('/ratings/user/:courseId', RatingController.getUserRating)
router.post('/ratings/:courseId', ratingAuthorization, RatingController.addRating)

router.get('/my-roadmaps', RoadmapController.getMyRoadmaps)
router.get('/my-roadmaps/:roadmapId', RoadmapController.getMyRoadmapById)
router.post('/my-roadmaps/:roadmapId', RoadmapController.enroll)
router.post('/my-roadmaps/steps/:stepId/complete', RoadmapController.completeStep)
router.delete('/my-roadmaps/steps/:stepId/complete', RoadmapController.uncompleteStep)

router.get('/telegram/status', TelegramController.getTelegramStatus)
router.post('/telegram/connect-token', TelegramController.generateConnectToken)
router.patch('/telegram/reminder', TelegramController.toggleReminder)
router.delete('/telegram/disconnect', TelegramController.disconnectTelegram)

module.exports = router
