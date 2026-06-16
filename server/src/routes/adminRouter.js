const express = require('express')
const router = express.Router()
const UserController = require('../controllers/admin/AdminUserController')
const CourseController = require('../controllers/admin/AdminCourseController')
const CategoryController = require('../controllers/admin/AdminCategoryController')
const VideoController = require('../controllers/admin/AdminVideoController')
const CommentController = require('../controllers/admin/AdminCommentController')
const AdminRoadmapController = require('../controllers/admin/AdminRoadmapController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const uploadImages = require('../middlewares/uploadImages')
const { upload } = require('../helpers/multer')

router.use(authentication, authorization('Admin'))

router.get('/users', UserController.getAll)
router.patch('/users/:userId/role', UserController.updateRole)

router.get('/courses', CourseController.getAll)
router.get('/courses/:courseId', CourseController.getById)
router.post('/courses', upload.array('Videos', 3), uploadImages, CourseController.create)
router.put('/courses/:courseId', CourseController.update)
router.patch('/courses/:courseId/status', CourseController.updateStatus)
router.patch('/courses/:courseId/approval', CourseController.updateApproval)

router.get('/categories', CategoryController.getAll)
router.post('/categories', CategoryController.create)
router.delete('/categories/:categoryId', CategoryController.destroy)

router.post('/videos/:courseId', upload.array('Videos', 1), uploadImages, VideoController.create)
router.get('/videos/:videoId', VideoController.getById)
router.patch('/videos/:videoId', VideoController.update)
router.delete('/videos/:videoId', VideoController.destroy)

router.delete('/comments/:commentId', CommentController.destroy)

router.get('/skill-domains', AdminRoadmapController.getAllSkillDomains)
router.post('/skill-domains', AdminRoadmapController.createSkillDomain)
router.put('/skill-domains/:domainId', AdminRoadmapController.updateSkillDomain)
router.delete('/skill-domains/:domainId', AdminRoadmapController.deleteSkillDomain)

router.get('/roadmaps', AdminRoadmapController.getAllRoadmaps)
router.get('/roadmaps/:roadmapId', AdminRoadmapController.getRoadmapById)
router.post('/roadmaps', AdminRoadmapController.createRoadmap)
router.put('/roadmaps/:roadmapId', AdminRoadmapController.updateRoadmap)
router.delete('/roadmaps/:roadmapId', AdminRoadmapController.deleteRoadmap)

router.post('/roadmaps/:roadmapId/steps', AdminRoadmapController.createStep)
router.put('/roadmap-steps/:stepId', AdminRoadmapController.updateStep)
router.delete('/roadmap-steps/:stepId', AdminRoadmapController.deleteStep)

module.exports = router
