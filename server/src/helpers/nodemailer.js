const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

function sendEmail({ email, subject, html }) {
  const mailOptions = {
    from: `"Bimble" <${process.env.GMAIL_USER}>`,
    to: email,
    subject,
    html,
  }
  transporter.sendMail(mailOptions).catch(console.error)
}

module.exports = sendEmail
