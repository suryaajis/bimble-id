const axios = require('axios')
const { UserCourse, Course } = require('../models')

const xenditClient = axios.create({
  baseURL: 'https://api.xendit.co/ewallets/charges',
  auth: { username: process.env.XENDIT_API_KEY, password: '' },
})

const ovoCharge = async (req, res, next) => {
  try {
    const { phoneNumber, userCourseId } = req.body

    const userCourse = await UserCourse.findOne({
      where: { id: Number(userCourseId) },
      include: [{ model: Course }],
    })

    if (!userCourse) throw { name: 'CourseNotFound' }

    const referenceId = `${req.user.email}-${userCourseId}-${Date.now()}`

    const { data } = await xenditClient.post('/', {
      reference_id: referenceId,
      currency: 'IDR',
      amount: userCourse.Course.price,
      checkout_method: 'ONE_TIME_PAYMENT',
      channel_code: 'ID_OVO',
      channel_properties: { mobile_number: phoneNumber },
    })

    await UserCourse.update(
      { chargeId: data.id, referenceId: data.reference_id },
      { where: { id: Number(userCourseId) } }
    )

    res.json(data)
  } catch (err) {
    next(err.response ?? err)
  }
}

const ovoStatus = async (req, res, next) => {
  try {
    const callbackToken = req.headers['x-callback-token']
    if (callbackToken !== process.env.XENDIT_VERIFICATION_TOKEN) {
      throw { name: 'Forbidden' }
    }

    const { id: chargeId, reference_id, status } = req.body.data
    const parts = reference_id.split('-')
    const userCourseId = Number(parts[1])

    if (status === 'SUCCEEDED') {
      await UserCourse.update({ isPaid: true }, { where: { id: userCourseId } })
    }

    res.json({ message: `UserCourse ${userCourseId} updated. Status: ${status}` })
  } catch (err) {
    next(err)
  }
}

module.exports = { ovoCharge, ovoStatus }
