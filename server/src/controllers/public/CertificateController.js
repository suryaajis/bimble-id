const { Certificate, UserCourse, Course, User } = require('../../models')
const { generateCertificateNumber, generateCertificateHTML } = require('../../helpers/certificate')

// CATATAN: Sertifikat hanya bisa didapat jika course sudah dibayar.
// Untuk saat ini, syarat hanya isPaid=true (tanpa cek progress video,
// karena UserVideoProgress belum tentu ada di branch ini).
// Di masa depan, bisa ditambahkan cek completion rate 100%.

const getCertificate = async (req, res, next) => {
  try {
    const { courseId } = req.params
    const UserId = req.user.id

    // Cek apakah user sudah beli kursus
    const userCourse = await UserCourse.findOne({
      where: { UserId, CourseId: courseId, isPaid: true },
      include: [{ model: Course }]
    })
    if (!userCourse) throw { name: 'CertificateNotEligible' }

    const user = await User.findByPk(UserId)

    // Cari atau buat sertifikat
    let certificate = await Certificate.findOne({ where: { UserId, CourseId: courseId } })
    if (!certificate) {
      const certificateNumber = generateCertificateNumber(UserId, Number(courseId))
      certificate = await Certificate.create({
        UserId,
        CourseId: courseId,
        certificateNumber,
        issuedAt: new Date(),
      })
    }

    const html = generateCertificateHTML({
      userName: user.name,
      courseName: userCourse.Course.name,
      difficulty: userCourse.Course.difficulty,
      issuedAt: certificate.issuedAt,
      certificateNumber: certificate.certificateNumber,
    })

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(html)
  } catch (err) {
    next(err)
  }
}

const getCertificateInfo = async (req, res, next) => {
  try {
    const { courseId } = req.params
    const UserId = req.user.id

    const userCourse = await UserCourse.findOne({
      where: { UserId, CourseId: courseId, isPaid: true }
    })
    if (!userCourse) throw { name: 'CertificateNotEligible' }

    const certificate = await Certificate.findOne({ where: { UserId, CourseId: courseId } })

    res.json({
      hasCertificate: !!certificate,
      certificate: certificate ? {
        certificateNumber: certificate.certificateNumber,
        issuedAt: certificate.issuedAt,
      } : null
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { getCertificate, getCertificateInfo }
