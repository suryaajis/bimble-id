const { Roadmap, RoadmapStep, SkillDomain, Course } = require('../../models')

class AdminRoadmapController {
  static async getAllSkillDomains(req, res, next) {
    try {
      const domains = await SkillDomain.findAll({ order: [['name', 'ASC']] })
      res.json(domains)
    } catch (err) {
      next(err)
    }
  }

  static async createSkillDomain(req, res, next) {
    try {
      const { name, description, icon } = req.body
      const domain = await SkillDomain.create({ name, description, icon })
      res.status(201).json(domain)
    } catch (err) {
      next(err)
    }
  }

  static async updateSkillDomain(req, res, next) {
    try {
      const domain = await SkillDomain.findByPk(req.params.domainId)
      if (!domain) throw { name: 'SkillDomainNotFound' }
      await domain.update(req.body)
      res.json(domain)
    } catch (err) {
      next(err)
    }
  }

  static async deleteSkillDomain(req, res, next) {
    try {
      const domain = await SkillDomain.findByPk(req.params.domainId)
      if (!domain) throw { name: 'SkillDomainNotFound' }
      await domain.destroy()
      res.json({ message: 'Skill domain deleted' })
    } catch (err) {
      next(err)
    }
  }

  static async getAllRoadmaps(req, res, next) {
    try {
      const roadmaps = await Roadmap.findAll({
        include: [
          { model: SkillDomain, attributes: ['id', 'name'] },
          { model: RoadmapStep, attributes: ['id'] },
        ],
        order: [['title', 'ASC']],
      })
      res.json(roadmaps)
    } catch (err) {
      next(err)
    }
  }

  static async getRoadmapById(req, res, next) {
    try {
      const roadmap = await Roadmap.findByPk(req.params.roadmapId, {
        include: [
          { model: SkillDomain, attributes: ['id', 'name', 'icon'] },
          {
            model: RoadmapStep,
            include: [{ model: Course, attributes: ['id', 'name', 'thumbnailUrl', 'difficulty'] }],
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

  static async createRoadmap(req, res, next) {
    try {
      const { title, description, thumbnailUrl, difficulty, SkillDomainId } = req.body
      const roadmap = await Roadmap.create({ title, description, thumbnailUrl, difficulty, SkillDomainId })
      res.status(201).json(roadmap)
    } catch (err) {
      next(err)
    }
  }

  static async updateRoadmap(req, res, next) {
    try {
      const roadmap = await Roadmap.findByPk(req.params.roadmapId)
      if (!roadmap) throw { name: 'RoadmapNotFound' }
      await roadmap.update(req.body)
      res.json(roadmap)
    } catch (err) {
      next(err)
    }
  }

  static async deleteRoadmap(req, res, next) {
    try {
      const roadmap = await Roadmap.findByPk(req.params.roadmapId)
      if (!roadmap) throw { name: 'RoadmapNotFound' }
      await roadmap.destroy()
      res.json({ message: 'Roadmap deleted' })
    } catch (err) {
      next(err)
    }
  }

  static async createStep(req, res, next) {
    try {
      const { roadmapId } = req.params
      const roadmap = await Roadmap.findByPk(roadmapId)
      if (!roadmap) throw { name: 'RoadmapNotFound' }

      const { title, description, order, CourseId, resourceUrl } = req.body
      const step = await RoadmapStep.create({ RoadmapId: roadmapId, title, description, order, CourseId, resourceUrl })
      res.status(201).json(step)
    } catch (err) {
      next(err)
    }
  }

  static async updateStep(req, res, next) {
    try {
      const step = await RoadmapStep.findByPk(req.params.stepId)
      if (!step) throw { name: 'RoadmapStepNotFound' }
      await step.update(req.body)
      res.json(step)
    } catch (err) {
      next(err)
    }
  }

  static async deleteStep(req, res, next) {
    try {
      const step = await RoadmapStep.findByPk(req.params.stepId)
      if (!step) throw { name: 'RoadmapStepNotFound' }
      await step.destroy()
      res.json({ message: 'Step deleted' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AdminRoadmapController
