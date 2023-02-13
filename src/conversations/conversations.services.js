const conversationsControllers = require('./conversations.controllers')
const handleResponses = require('../utils/handleResponses')

const getAllConversations = (req,res) =>{
  conversationsControllers.findAllConversations()
    .then(data => {
      handleResponses.success({
        res,
        data,
        message: 'All conversations collected successfully',
      })
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while getting all conversations'
      })
    })
}

const getConversationById = (req,res) => {
  const id = req.params.id 
  conversationsControllers.findConversationById(id)
    .then(data => {
      if (data) {
        handleResponses.success({
          res,
          data,
          status: 200,
          message: 'Conversation with id ' + data.id
        })
      } else {
        handleResponses.error({
          res,
          status: 404,
          message: 'Conversation not found'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while getting a conversation'
      })
    })
}

const postConversation = (req, res) => {
  const conversationObj = req.body
  conversationsControllers.createNewConversation(conversationObj)
    .then(data => {
      handleResponses.success({
        res,
        data,
        status: 201,
        message: 'Conversation created successfully'
      })
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while creating a conversation'
      })
    })
}

const patchConversation = (req, res) => {
  const id = req.params.id
  const conversationOBj = req.body 
  conversationsControllers.updateConversation(id, conversationOBj)
    .then((data, conversationObj) => {
      if(data){
        handleResponses.success({
          res,
          data,
          status: 200,
          message: `Conversation with id ${data.id} has been updated`
        })
      } else if(!conversationObj){
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
          message: 'Conversation not found'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while updating the conversation'
      })
    })
}

const deleteConversation = (req, res) => {
  const id = req.params.id
  conversationsControllers.deleteConversation(id)
    .then(data => {
      if (data){
        handleResponses.success({
          res,
          data,
          status: 200,
          message: 'The conversation has been deleted'
        })
      } else {
        handleResponses.error({
          res,
          data,
          status: 404,
          message: 'Conversation not found'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while deleting the conversation'
      })
    })
}

module.exports = {
  getAllConversations,
  getConversationById,
  postConversation,
  patchConversation,
  deleteConversation
}

