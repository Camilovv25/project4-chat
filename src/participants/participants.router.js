const participantsServices = require('./participants.services')

const router = require('express').Router()

router.get('/participants', participantsServices.getAllParticipants)
router.get('/participants/:id', participantsServices.getParticipantById)
router.post('/participants', participantsServices.postParticipant)
router.patch('/participants/:id', participantsServices.patchParticipant)
router.delete('/participants', participantsServices.deleteParticipant)

module.exports = router 