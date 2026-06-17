// Role-based authorization factory.
// Usage: router.use(authentication, authorization('Admin'))
//        router.use(authentication, authorization('Instructor', 'Admin'))
const authorization = (...roles) => (req, res, next) => {
  if (roles.includes(req.user?.role)) return next()
  next({ name: 'Forbidden' })
}

module.exports = authorization
