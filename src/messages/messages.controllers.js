const Messages = require('../models/messages.models')

const findAllMessages = async() => {
  const data = await Messages.findAll();
  return data
}

const findMessageById = async (id) => {
  const data = await Messages.findOne({
    where: {id}
  });
  return data 
}

const createNewMessage = async (messageOBj) => {
  const newMessage = {
    id: messageOBj.id,
    profileImg: messageOBj.profileImg,
    name: messageOBj.name,
    createdBy: messageOBj.createdBy,
    isGroup: messageOBj.isGroup
  }
  const data = await Messages.create(newMessage)
  return data 
}

const updateMessage = async (id, messageOBj) => {
  const data = await Messages.update(messageOBj, {
    where: {id}
  })
  return data[0]
}

const deleteMessage = async (id)=> {
  const data = await Messages.destroy({
    where: {id}
  })
  return data 
}

module.exports = {
  findAllMessages,
  findMessageById,
  createNewMessage,
  updateMessage,
  deleteMessage
}