const messagesServices = require('./messages.services')

const router = require('express').Router()

router.get('/messages', messagesServices.getAllMessages)
router.get('/messages/:id', messagesServices.getMessageById)
router.post('/messages', messagesServices.postMessage)
router.patch('/messages/:id', messagesServices.patchMessage)
router.delete('/messages', messagesServices.deleteMessage)

module.exports = router 