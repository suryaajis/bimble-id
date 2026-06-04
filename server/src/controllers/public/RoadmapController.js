const { Roadmap, RoadmapStep, SkillDomain, UserRoadmap, UserRoadmapStep, Course } = require('../../models')

class RoadmapController {
  static async getSkillDomains(req, res, next) {
    try {
      const domains = await SkillDomain.findAll({
        include: [{ model: Roadmap, attributes: ['id', 'title', 'difficulty', 'thumbnailUrl'] }],
        order: [['name', 'ASC']],
      })
      res.json(domains)
    } catch (err) {
      next(err)
    }
  }

  static async getAll(req, res, next) {
    try {
      const { domainId } = req.query
      const where = domainId ? { SkillDomainId: domainId } : {}

      const roadmaps = await Roadmap.findAll({
        where,
        include: [
          { model: SkillDomain, attributes: ['id', 'name', 'icon'] },
          { model: RoadmapStep, attributes: ['id'] },
        ],
        order: [['title', 'ASC']],
      })
      res.json(roadmaps)
    } catch (err) {
      next(err)
    }
  }

  static async getById(req, res, next) {
    try {
      const roadmap = await Roadmap.findByPk(req.params.roadmapId, {
        include: [
          { model: SkillDomain, attributes: ['id', 'name', 'icon'] },
          {
            model: RoadmapStep,
            include: [{ model: Course, attributes: ['id', 'name', 'thumbnailUrl', 'difficulty', 'price'] }],
            order: [['order', 'ASC']],
          },
        ],
        order: [[RoadmapStep, 'order', 'ASC']],
      })
      if (!roadmap) throw { name: 'RoadmapNotFound' }
      res.json(roadmap)
    } catch (err) {
      next(err)
    }
  }

  static async getMyRoadmaps(req, res, next) {
    try {
      const userRoadmaps = await UserRoadmap.findAll({
        where: { UserId: req.user.id },
        include: [
          {
            model: Roadmap,
            include: [
              { model: SkillDomain, attributes: ['id', 'name', 'icon'] },
              { model: RoadmapStep, attributes: ['id'] },
            ],
          },
        ],
        order: [['createdAt', 'DESC']],
      })

      const completedSteps = await UserRoadmapStep.findAll({
        where: { UserId: req.user.id },
        attributes: ['RoadmapStepId', 'completedAt'],
      })
      const completedStepIds = new Set(completedSteps.map(s => s.RoadmapStepId))

      const result = userRoadmaps.map(ur => ({
        ...ur.toJSON(),
        completedStepIds: [...completedStepIds],
        progress: ur.Roadmap.RoadmapSteps.length
          ? Math.round((ur.Roadmap.RoadmapSteps.filter(s => completedStepIds.has(s.id)).length / ur.Roadmap.RoadmapSteps.length) * 100)
          : 0,
      }))

      res.json(result)
    } catch (err) {
      next(err)
    }
  }

  static async getMyRoadmapById(req, res, next) {
    try {
      const userRoadmap = await UserRoadmap.findOne({
        where: { UserId: req.user.id, RoadmapId: req.params.roadmapId },
      })
      if (!userRoadmap) throw { name: 'RoadmapNotEnrolled' }

      const roadmap = await Roadmap.findByPk(req.params.roadmapId, {
        include: [
          { model: SkillDomain, attributes: ['id', 'name', 'icon'] },
          {
            model: RoadmapStep,
            include: [{ model: Course, attributes: ['id', 'name', 'thumbnailUrl', 'difficulty', 'price'] }],
          },
        ],
        order: [[RoadmapStep, 'order', 'ASC']],
      })

      const completedSteps = await UserRoadmapStep.findAll({
        where: { UserId: req.user.id },
        attributes: ['RoadmapStepId', 'completedAt'],
      })
      const completedStepIds = new Set(completedSteps.map(s => s.RoadmapStepId))

      res.json({
        ...userRoadmap.toJSON(),
        Roadmap: roadmap,
        completedStepIds: [...completedStepIds],
        progress: roadmap.RoadmapSteps.length
          ? Math.round((roadmap.RoadmapSteps.filter(s => completedStepIds.has(s.id)).length / roadmap.RoadmapSteps.length) * 100)
          : 0,
      })
    } catch (err) {
      next(err)
    }
  }

  static async enroll(req, res, next) {
    try {
      const { roadmapId } = req.params
      const userId = req.user.id

      const roadmap = await Roadmap.findByPk(roadmapId)
      if (!roadmap) throw { name: 'RoadmapNotFound' }

      const existing = await UserRoadmap.findOne({ where: { UserId: userId, RoadmapId: roadmapId } })
      if (existing) throw { name: 'RoadmapAlreadyEnrolled' }

      const enrollment = await UserRoadmap.create({ UserId: userId, RoadmapId: roadmapId, status: 'active' })
      res.status(201).json(enrollment)
    } catch (err) {
      next(err)
    }
  }

  static async completeStep(req, res, next) {
    try {
      const { stepId } = req.params
      const userId = req.user.id

      const step = await RoadmapStep.findByPk(stepId)
      if (!step) throw { name: 'RoadmapStepNotFound' }

      const enrolled = await UserRoadmap.findOne({ where: { UserId: userId, RoadmapId: step.RoadmapId } })
      if (!enrolled) throw { name: 'RoadmapNotEnrolled' }

      const existing = await UserRoadmapStep.findOne({ where: { UserId: userId, RoadmapStepId: stepId } })
      if (existing) throw { name: 'StepAlreadyCompleted' }

      const record = await UserRoadmapStep.create({ UserId: userId, RoadmapStepId: stepId, completedAt: new Date() })

      const allSteps = await RoadmapStep.findAll({ where: { RoadmapId: step.RoadmapId } })
      const doneSteps = await UserRoadmapStep.findAll({
        where: { UserId: userId, RoadmapStepId: allSteps.map(s => s.id) },
      })
      if (doneSteps.length === allSteps.length) {
        await enrolled.update({ status: 'completed' })
      }

      res.status(201).json(record)
    } catch (err) {
      next(err)
    }
  }

  static async uncompleteStep(req, res, next) {
    try {
      const { stepId } = req.params
      const userId = req.user.id

      const record = await UserRoadmapStep.findOne({ where: { UserId: userId, RoadmapStepId: stepId } })
      if (!record) throw { name: 'RoadmapStepNotFound' }

      const step = await RoadmapStep.findByPk(stepId)
      const enrolled = await UserRoadmap.findOne({ where: { UserId: userId, RoadmapId: step.RoadmapId } })
      if (enrolled?.status === 'completed') {
        await enrolled.update({ status: 'active' })
      }

      await record.destroy()
      res.json({ message: 'Step marked as incomplete' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = RoadmapController
