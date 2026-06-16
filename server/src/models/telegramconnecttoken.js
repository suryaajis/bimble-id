'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TelegramConnectToken extends Model {
    static associate(models) {
      TelegramConnectToken.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  TelegramConnectToken.init({
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
  }, { sequelize, modelName: 'TelegramConnectToken' })
  return TelegramConnectToken
}
