const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  try {
    const token = req.headers['access_token'] || req.headers['authorization']?.split(' ')[1] || req.query['access_token']
    if (!token) throw { name: 'Unauthorized' }

    const decoded = verifyToken(token)

    const user = await User.findOne({ where: { id: decoded.id, email: decoded.email } })
    if (!user) throw { name: 'Unauthorized' }

    req.user = { id: user.id, email: user.email, role: user.role }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication
