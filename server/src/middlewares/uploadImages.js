const FormData = require('form-data')
const axios = require('axios')

const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) return next()

    const videos = []

    for (const file of req.files) {
      if (file.mimetype !== 'video/mp4') throw { name: 'InvalidFileFormat' }
      if (file.size > 25_000_000) throw { name: 'InvalidFileSize' }

      const form = new FormData()
      form.append('file', file.buffer.toString('base64'))
      form.append('fileName', file.originalname)

      const { data } = await axios.post(
        'https://upload.imagekit.io/api/v1/files/upload',
        form,
        {
          headers: form.getHeaders(),
          auth: { username: process.env.IMAGE_KIT_KEY, password: '' },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      )

      const nameParts = data.name.split('_')
      nameParts.pop()
      videos.push({ name: nameParts.join(' '), videoUrl: data.url })
    }

    req.body.Videos = videos
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = uploadImages
