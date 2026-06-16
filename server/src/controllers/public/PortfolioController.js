const { User, UserCourse, Course, Category, Rating, UserRoadmap, Roadmap, SkillDomain } = require('../../models')
const { Op } = require('sequelize')

const getPortfolio = async (req, res, next) => {
  try {
    const { username } = req.params

    // Cari user berdasarkan name (case-insensitive)
    const user = await User.findOne({
      where: { name: { [Op.iLike]: username } },
      attributes: ['id', 'name', 'createdAt'],
    })
    if (!user) throw { name: 'UserNotFound' }

    // Kursus yang sudah dibeli
    const userCourses = await UserCourse.findAll({
      where: { UserId: user.id, isPaid: true },
      include: [{
        model: Course,
        attributes: ['id', 'name', 'difficulty', 'thumbnailUrl'],
        include: [{ model: Category, attributes: ['name'] }],
      }],
    })

    // Roadmap yang diikuti
    const userRoadmaps = await UserRoadmap.findAll({
      where: { UserId: user.id },
      include: [{
        model: Roadmap,
        attributes: ['id', 'title', 'difficulty'],
        include: [{ model: SkillDomain, attributes: ['name', 'icon'] }],
      }],
    })

    // Rating yang pernah diberikan (untuk hitung keaktifan)
    const ratings = await Rating.findAll({
      where: { UserId: user.id },
      attributes: ['rating', 'CourseId'],
    })

    // Kumpulkan skill unik dari kategori kursus
    const skills = [...new Set(
      userCourses
        .filter(uc => uc.Course?.Category)
        .map(uc => uc.Course.Category.name)
    )]

    // Stats
    const stats = {
      totalCourses: userCourses.length,
      totalRoadmaps: userRoadmaps.length,
      completedRoadmaps: userRoadmaps.filter(ur => ur.status === 'completed').length,
      averageRating: ratings.length > 0
        ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
        : null,
      memberSince: user.createdAt,
    }

    res.json({
      user: { name: user.name },
      stats,
      skills,
      courses: userCourses.map(uc => ({
        id: uc.Course.id,
        name: uc.Course.name,
        difficulty: uc.Course.difficulty,
        thumbnailUrl: uc.Course.thumbnailUrl,
        category: uc.Course.Category?.name,
      })),
      roadmaps: userRoadmaps.map(ur => ({
        id: ur.Roadmap.id,
        title: ur.Roadmap.title,
        difficulty: ur.Roadmap.difficulty,
        status: ur.status,
        skillDomain: ur.Roadmap.SkillDomain?.name,
        icon: ur.Roadmap.SkillDomain?.icon,
      })),
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { getPortfolio }
