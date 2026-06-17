const axios = require('axios')
const { UserCourse, Course } = require('../models')

// Xendit Unified Payment API v3
// Docs: https://docs.xendit.co/apidocs/create-payment-request
const xenditClient = axios.create({
  baseURL: 'https://api.xendit.co/v3',
  auth: { username: process.env.XENDIT_API_KEY, password: '' },
  headers: { 'api-version': '2024-11-11' },
})

// Konfigurasi per metode. `flow` menentukan channel_properties yang dikirim:
//  - mobile   : OVO -> push ke app, butuh nomor HP (mobile_number)
//  - redirect : DANA/GOPAY/SHOPEEPAY -> user diarahkan ke halaman/app pembayaran
//  - qris     : tampilkan QR string untuk discan
const PAYMENT_CONFIG = {
  OVO: { channelCode: 'OVO', flow: 'mobile' },
  DANA: { channelCode: 'DANA', flow: 'redirect' },
  GOPAY: { channelCode: 'GOPAY', flow: 'redirect' },
  SHOPEEPAY: { channelCode: 'SHOPEEPAY', flow: 'redirect' },
  QRIS: { channelCode: 'QRIS', flow: 'qris' },
}

const buildChannelProperties = (flow, phoneNumber) => {
  switch (flow) {
    case 'mobile':
      return { mobile_number: phoneNumber }
    case 'redirect':
      return {
        success_return_url: `${process.env.CLIENT_URL}/my-courses`,
        failure_return_url: `${process.env.CLIENT_URL}/buy`,
      }
    case 'qris':
      return { expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString() } // 30 menit
    default:
      return {}
  }
}

// Ambil value dari actions[] berdasarkan descriptor (QR_STRING / WEB_URL / DEEPLINK_URL)
const findAction = (actions = [], descriptor) =>
  actions.find((a) => a.descriptor === descriptor)?.value ?? null

// Buat payment request untuk semua metode (OVO/DANA/GOPAY/SHOPEEPAY/QRIS)
const createPayment = async (req, res, next) => {
  try {
    const { phoneNumber, userCourseId, paymentMethod = 'OVO' } = req.body

    const method = paymentMethod.toUpperCase()
    const config = PAYMENT_CONFIG[method]
    if (!config) throw { name: 'InvalidPaymentMethod' }
    if (config.flow === 'mobile' && !phoneNumber) throw { name: 'PhoneNumberRequired' }

    const userCourse = await UserCourse.findOne({
      where: { id: Number(userCourseId), UserId: req.user.id },
      include: [{ model: Course }],
    })
    if (!userCourse) throw { name: 'CourseNotFound' }

    // Course gratis (harga 0/null) tidak perlu charge ke Xendit — langsung lunas
    const isFree = !userCourse.Course?.price || Number(userCourse.Course.price) <= 0
    if (isFree) {
      if (!userCourse.isPaid) await userCourse.update({ isPaid: true })
      return res.json({ status: 'SUCCEEDED', free: true })
    }

    if (userCourse.isPaid) throw { name: 'CourseAlreadyPurchased' }

    const referenceId = `${req.user.email}-${userCourseId}-${Date.now()}`

    const { data } = await xenditClient.post('/payment_requests', {
      reference_id: referenceId,
      type: 'PAY',
      country: 'ID',
      currency: 'IDR',
      request_amount: userCourse.Course.price,
      channel_code: config.channelCode,
      channel_properties: buildChannelProperties(config.flow, phoneNumber),
    })

    await userCourse.update({
      chargeId: data.payment_request_id,
      referenceId: data.reference_id,
      paymentMethod: method,
    })

    res.json({
      paymentRequestId: data.payment_request_id,
      status: data.status,
      qrString: findAction(data.actions, 'QR_STRING'),
      redirectUrl: findAction(data.actions, 'WEB_URL') ?? findAction(data.actions, 'DEEPLINK_URL'),
    })
  } catch (err) {
    console.log(err)
    next(err.response ?? err)
  }
}

// Cek status pembayaran langsung ke Xendit (tanpa menunggu webhook).
// Berguna untuk tombol "Cek Status" / retry, terutama di lokal/dev di mana
// webhook tidak bisa masuk tanpa URL publik.
const checkStatus = async (req, res, next) => {
  try {
    const { userCourseId } = req.params

    const userCourse = await UserCourse.findOne({
      where: { id: Number(userCourseId), UserId: req.user.id },
    })
    if (!userCourse) throw { name: 'CourseNotFound' }

    if (userCourse.isPaid) return res.json({ isPaid: true, status: 'SUCCEEDED' })
    if (!userCourse.chargeId) return res.json({ isPaid: false, status: 'UNPAID' })

    const { data } = await xenditClient.get(`/payment_requests/${userCourse.chargeId}`)
    if (data.status === 'SUCCEEDED') {
      await userCourse.update({ isPaid: true })
    }

    res.json({ isPaid: data.status === 'SUCCEEDED', status: data.status })
  } catch (err) {
    next(err.response ?? err)
  }
}

// Webhook v3: satu handler untuk semua metode.
// Konfigurasi di Xendit Dashboard -> Webhooks, kirim event "payment.succeeded"
// (dan opsional payment.failed/expired) ke endpoint POST /payment/webhook.
const paymentWebhook = async (req, res, next) => {
  try {
    const callbackToken = req.headers['x-callback-token']
    if (callbackToken !== process.env.XENDIT_VERIFICATION_TOKEN) throw { name: 'Forbidden' }

    const { event } = req.body
    const data = req.body.data ?? {}
    const referenceId = data.reference_id ?? ''
    const userCourseId = Number(referenceId.split('-')[1])

    const succeeded = data.status === 'SUCCEEDED' || event === 'payment.succeeded'
    if (succeeded && userCourseId) {
      await UserCourse.update({ isPaid: true }, { where: { id: userCourseId } })
    }

    res.json({ message: `UserCourse ${userCourseId} processed. Event: ${event}, Status: ${data.status}` })
  } catch (err) {
    next(err)
  }
}

module.exports = { createPayment, checkStatus, paymentWebhook }
