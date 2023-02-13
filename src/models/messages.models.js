const {DataTypes} = require('sequelize')
const db = require('../utils/database')
const participantsModel = require('./participants.models')

const Messages = db.define('Messages', {
  id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  participantId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: participantsModel,
      key: 'id'
    }
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: 'sent'
  }
})

module.exports = Messages