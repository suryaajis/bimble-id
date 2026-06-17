'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      Video.belongsTo(models.Course, { foreignKey: 'CourseId' })
      Video.hasMany(models.Comment, { foreignKey: 'VideoId' })
      Video.hasMany(models.UserVideoProgress, { foreignKey: 'VideoId' })
    }
  }

  Video.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Video name can't be empty" },
        notNull: { msg: "Video name can't be empty" },
      },
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    youtubeUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidYoutubeUrl(value) {
          if (!value) return
          const isYoutube = /^https?:\/\/(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)/.test(value)
          if (!isYoutube) throw new Error('Must be a valid YouTube URL')
        },
      },
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    validate: {
      mustHaveVideoSource() {
        if (!this.videoUrl && !this.youtubeUrl) {
          throw new Error('A video must have either a file URL or a YouTube URL')
        }
      },
    },
    sequelize,
    modelName: 'Video',
  })

  return Video
}
