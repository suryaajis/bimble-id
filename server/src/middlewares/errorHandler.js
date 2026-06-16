const errorHandler = (err, req, res, next) => {
  const errors = {
    SequelizeValidationError: [400, err.errors?.[0]?.message ?? 'Validation error'],
    SequelizeUniqueConstraintError: [400, err.errors?.[0]?.message ?? 'Unique constraint error'],
    InvalidCredentials: [401, 'Invalid email or password'],
    Unauthorized: [401, 'Unauthorized - please log in'],
    JsonWebTokenError: [401, 'Invalid token'],
    TokenExpiredError: [401, 'Token expired - please log in again'],
    Forbidden: [403, 'You are not authorized to perform this action'],
    CourseNotFound: [404, 'Course not found'],
    VideoNotFound: [404, 'Video not found'],
    CategoryNotFound: [404, 'Category not found'],
    CommentNotFound: [404, 'Comment not found'],
    CourseAlreadyPurchased: [400, 'You have already purchased this course'],
    CourseNotPaid: [403, 'You must purchase this course first'],
    AlreadyRated: [400, 'You have already rated this course'],
    InvalidFileFormat: [400, 'File must be in MP4 format'],
    InvalidFileSize: [400, 'File size must not exceed 25MB'],
    RoadmapNotFound: [404, 'Roadmap not found'],
    RoadmapStepNotFound: [404, 'Roadmap step not found'],
    SkillDomainNotFound: [404, 'Skill domain not found'],
    RoadmapAlreadyEnrolled: [400, 'You are already enrolled in this roadmap'],
    RoadmapNotEnrolled: [403, 'You are not enrolled in this roadmap'],
    StepAlreadyCompleted: [400, 'You have already completed this step'],
    CertificateNotEligible: [403, 'You must purchase this course to get a certificate'],
    CertificateNotFound: [404, 'Certificate not found'],
  }

  const [code, message] = errors[err.name] ?? [500, 'Internal server error']
  res.status(code).json({ message })
}

module.exports = errorHandler
