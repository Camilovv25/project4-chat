const conversationsServices = require('./conversations.services')

const router = require('express').Router()

router.get('/conversations', conversationsServices.getAllConversations)
router.get('/conversations/:id', conversationsServices.getConversationById)
router.post('/conversations', conversationsServices.postConversation)
router.patch('/conversations/:id', conversationsServices.patchConversation)
router.delete('/conversations', conversationsServices.deleteConversation)

module.exports = router 