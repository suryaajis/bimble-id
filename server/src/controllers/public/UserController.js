const { User } = require('../../models')
const { comparePassword } = require('../../helpers/bcrypt')
const { signToken } = require('../../helpers/jwt')
const sendEmail = require('../../helpers/nodemailer')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body
      // Self-service signup may pick Instructor; anything else (incl. Admin) falls back to User.
      const role = req.body.role === 'Instructor' ? 'Instructor' : 'User'
      const user = await User.create({ name, email, password, role })

      const welcome = role === 'Instructor'
        ? `<h2>Hi ${user.name}!</h2><p>Welcome to Bimble as an instructor. Create your first course and start sharing your knowledge!</p>`
        : `<h2>Hi ${user.name}!</h2><p>Thank you for joining Bimble. Start your learning journey today!</p>`

      sendEmail({ email: user.email, subject: 'Welcome to Bimble!', html: welcome })

      res.status(201).json({ name: user.name, email: user.email, role: user.role })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw { name: 'InvalidCredentials' }

      const user = await User.findOne({ where: { email } })
      if (!user || !comparePassword(password, user.password)) {
        throw { name: 'InvalidCredentials' }
      }

      const token = signToken({ id: user.id, name: user.name, email: user.email, role: user.role })
      res.json({ access_token: token, role: user.role, name: user.name })
    } catch (err) {
      next(err)
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { idToken } = req.body
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      const { email, given_name } = ticket.getPayload()

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          name: given_name,
          password: Math.random().toString(36).substring(4),
          role: 'User',
        },
      })

      if (created) {
        sendEmail({
          email: user.email,
          subject: 'Welcome to Bimble!',
          html: `<h2>Hi ${user.name}!</h2><p>Thank you for joining Bimble via Google. Start your learning journey today!</p>`,
        })
      }

      const token = signToken({ id: user.id, name: user.name, email: user.email, role: user.role })
      res.json({ access_token: token, role: user.role, name: user.name })
    } catch (err) {
      next(err)
    }
  }

  static async getMe(req, res, next) {
    try {
      const user = await User.findOne({
        where: { email: req.user.email },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      })
      res.json(user)
    } catch (err) {
      next(err)
    }
  }

  static async updateMe(req, res, next) {
    try {
      const { name, email } = req.body
      await User.update({ name, email }, { where: { id: req.user.id } })
      res.json({ message: 'Profile updated successfully' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
