const axios = require('axios')
const { UserCourse, Course } = require('../models')

const xenditEwalletClient = axios.create({
  baseURL: 'https://api.xendit.co/ewallets/charges',
  auth: { username: process.env.XENDIT_API_KEY, password: '' },
})

const xenditQrisClient = axios.create({
  baseURL: 'https://api.xendit.co/qr_codes',
  auth: { username: process.env.XENDIT_API_KEY, password: '' },
})

// Config per payment method
const PAYMENT_CONFIG = {
  OVO: { channelCode: 'ID_OVO', requiresPhone: true, type: 'ewallet' },
  GOPAY: { channelCode: 'ID_GOPAY', requiresPhone: true, type: 'ewallet' },
  DANA: { channelCode: 'ID_DANA', requiresPhone: true, type: 'ewallet' },
  SHOPEEPAY: { channelCode: 'ID_SHOPEEPAY', requiresPhone: false, type: 'ewallet' },
  QRIS: { type: 'qris' },
}

const ewalletCharge = async (req, res, next) => {
  try {
    const { phoneNumber, userCourseId, paymentMethod = 'OVO' } = req.body

    const method = paymentMethod.toUpperCase()
    const config = PAYMENT_CONFIG[method]
    if (!config || config.type !== 'ewallet') throw { name: 'InvalidPaymentMethod' }
    if (config.requiresPhone && !phoneNumber) throw { name: 'PhoneNumberRequired' }

    const userCourse = await UserCourse.findOne({
      where: { id: Number(userCourseId) },
      include: [{ model: Course }],
    })
    if (!userCourse) throw { name: 'CourseNotFound' }

    const referenceId = `${req.user.email}-${userCourseId}-${Date.now()}`

    const channelProperties = config.requiresPhone
      ? { mobile_number: phoneNumber }
      : { success_redirect_url: `${process.env.CLIENT_URL}/my-courses` }

    const { data } = await xenditEwalletClient.post('/', {
      reference_id: referenceId,
      currency: 'IDR',
      amount: userCourse.Course.price,
      checkout_method: 'ONE_TIME_PAYMENT',
      channel_code: config.channelCode,
      channel_properties: channelProperties,
    })

    await UserCourse.update(
      { chargeId: data.id, referenceId: data.reference_id, paymentMethod: method },
      { where: { id: Number(userCourseId) } }
    )

    res.json(data)
  } catch (err) {
    next(err.response ?? err)
  }
}

const qrisCharge = async (req, res, next) => {
  try {
    const { userCourseId } = req.body

    const userCourse = await UserCourse.findOne({
      where: { id: Number(userCourseId) },
      include: [{ model: Course }],
    })
    if (!userCourse) throw { name: 'CourseNotFound' }

    const referenceId = `${req.user.email}-${userCourseId}-${Date.now()}`
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 menit

    const { data } = await xenditQrisClient.post('/', {
      reference_id: referenceId,
      type: 'DYNAMIC',
      currency: 'IDR',
      amount: userCourse.Course.price,
      expires_at: expiresAt.toISOString(),
    })

    await UserCourse.update(
      { chargeId: data.id, referenceId: data.reference_id, paymentMethod: 'QRIS' },
      { where: { id: Number(userCourseId) } }
    )

    res.json(data)
  } catch (err) {
    next(err.response ?? err)
  }
}

// Unified webhook handler untuk semua e-wallet
const ewalletStatus = async (req, res, next) => {
  try {
    const callbackToken = req.headers['x-callback-token']
    if (callbackToken !== process.env.XENDIT_VERIFICATION_TOKEN) throw { name: 'Forbidden' }

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

// Webhook handler untuk QRIS
const qrisStatus = async (req, res, next) => {
  try {
    const callbackToken = req.headers['x-callback-token']
    if (callbackToken !== process.env.XENDIT_VERIFICATION_TOKEN) throw { name: 'Forbidden' }

    const { reference_id, status } = req.body.data
    const parts = reference_id.split('-')
    const userCourseId = Number(parts[1])

    if (status === 'SUCCEEDED') {
      await UserCourse.update({ isPaid: true }, { where: { id: userCourseId } })
    }

    res.json({ message: `QRIS UserCourse ${userCourseId} updated. Status: ${status}` })
  } catch (err) {
    next(err)
  }
}

// Keep backward compat alias
const ovoCharge = ewalletCharge
const ovoStatus = ewalletStatus

module.exports = { ovoCharge, ovoStatus, ewalletCharge, ewalletStatus, qrisCharge, qrisStatus }
