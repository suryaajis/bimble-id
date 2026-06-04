const authorization = (req, res, next) => {
  if (req.user?.role === 'Admin') return next()
  next({ name: 'Forbidden' })
}

module.exports = authorization
