const participantsControllers = require('./participants.controllers')
const handleResponses = require('../utils/handleResponses')

const getAllParticipants = (req,res) =>{
  participantsControllers.findAllParticipants()
    .then(data => {
      handleResponses.success({
        res,
        data,
        message: 'All participants collected successfully',
      })
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while getting all participants'
      })
    })
}

const getParticipantById = (req,res) => {
  const id = req.params.id 
  participantsControllers.findParticipantById(id)
    .then(data => {
      if (data) {
        handleResponses.success({
          res,
          data,
          status: 200,
          message: 'Participant with id ' + data.id
        })
      } else {
        handleResponses.error({
          res,
          status: 404,
          message: 'Participant not found'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while getting a participant'
      })
    })
}

const postParticipant = (req, res) => {
  const participantObj = req.body
  participantsControllers.createNewParticipant(participantObj)
    .then(data => {
      handleResponses.success({
        res,
        data,
        status: 201,
        message: 'Participant created successfully'
      })
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while creating a participant'
      })
    })
}

const patchParticipant = (req, res) => {
  const id = req.params.id
  const participantOBj = req.body 
  participantsControllers.updateParticipant(id, participantOBj)
    .then((data, participantObj) => {
      if(data){
        handleResponses.success({
          res,
          data,
          status: 200,
          message: `Participant with id ${data.id} has been updated`
        })
      } else if(!participantObj){
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
          message: 'Participant not found'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while updating the participant'
      })
    })
}

const deleteParticipant = (req, res) => {
  const id = req.params.id
  participantsControllers.deleteParticipant(id)
    .then(data => {
      if (data){
        handleResponses.success({
          res,
          data,
          status: 200,
          message: 'The participant has been deleted'
        })
      } else {
        handleResponses.error({
          res,
          data,
          status: 404,
          message: 'Participant not found'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while deleting the participant'
      })
    })
}

module.exports = {
  getAllParticipants,
  getParticipantById,
  postParticipant,
  patchParticipant,
  deleteParticipant
}
