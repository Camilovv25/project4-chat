const messagesControllers = require('./messages.controllers')
const handleResponses = require('../utils/handleResponses')

const getAllMessages = (req,res) =>{
  messagesControllers.findAllMessages()
    .then(data => {
      handleResponses.success({
        res,
        data,
        message: 'All messages collected successfully',
      })
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while getting all messages'
      })
    })
}

const getMessageById = (req,res) => {
  const id = req.params.id 
  messagesControllers.findMessageById(id)
    .then(data => {
      if (data) {
        handleResponses.success({
          res,
          data,
          status: 200,
          message: 'Message with id ' + data.id
        })
      } else {
        handleResponses.error({
          res,
          status: 404,
          message: 'Message not found'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while getting a Message'
      })
    })
}

const postMessage = (req, res) => {
  const messageObj = req.body
  messagesControllers.createNewMessage(messageObj)
    .then(data => {
      handleResponses.success({
        res,
        data,
        status: 201,
        message: 'Message created successfully'
      })
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while creating a message'
      })
    })
}

const patchMessage = (req, res) => {
  const id = req.params.id
  const messageOBj = req.body 
  messagesControllers.updateMessage(id, messageOBj)
    .then((data, messageObj) => {
      if(data){
        handleResponses.success({
          res,
          data,
          status: 200,
          message: `Message with id ${data.id} has been updated`
        })
      } else if(!messageObj){
        handleResponses.error({
          res,
          data,
          status: 400,
          message: 'No changes indicated'
        })
      }else {
        handleResponses.error({
          res,
          data,
          status: 404,
          message: 'Message not found'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while updating the message'
      })
    })
}

const deleteMessage = (req, res) => {
  const id = req.params.id
  messagesControllers.deleteMessage(id)
    .then(data => {
      if (data){
        handleResponses.success({
          res,
          data,
          status: 200,
          message: 'The message has been deleted'
        })
      } else {
        handleResponses.error({
          res,
          data,
          status: 404,
          message: 'Message not found'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while deleting the message'
      })
    })
}

module.exports = {
  getAllMessages,
  getMessageById,
  postMessage,
  patchMessage,
  deleteMessage
}
