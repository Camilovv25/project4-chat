const usersControllers = require('./users.controllers')
const handleResponses = require('../utils/handleResponses')

const getAllUsers = (req,res) =>{
  usersControllers.findAllUsers()
    .then(data => {
      handleResponses.success({
        res,
        data,
        message: 'All users collected successfully',
      })
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while getting all users'
      })
    })
}

const getUserById = (req,res) => {
  const id = req.params.id 
  usersControllers.findUserById(id)
    .then(data => {
      if (data) {
        handleResponses.success({
          res,
          data,
          status: 200,
          message: 'User with id ' + data.id
        })
      } else {
        handleResponses.error({
          res,
          status: 404,
          message: 'User not found'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while getting a user'
      })
    })
}

const postUser = (req, res) => {
  const userObj = req.body
  usersControllers.createNewUser(userObj)
    .then(data => {
      handleResponses.success({
        res,
        data,
        status: 201,
        message: 'User created successfully'
      })
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while creating a user'
      })
    })
}

const patchUser = (req, res) => {
  const id = req.params.id
  const userOBj = req.body 
  usersControllers.updateUser(id, userOBj)
    .then((data, userObj) => {
      if(data){
        handleResponses.success({
          res,
          data,
          status: 200,
          message: `User with id ${data.id} has been updated`
        })
      } else if(!userObj){
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
          message: 'User not found'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while updating the user'
      })
    })
}

const deleteUser = (req, res) => {
  const id = req.params.id
  usersControllers.deleteUser(id)
    .then(data => {
      if (data){
        handleResponses.success({
          res,
          data,
          status: 200,
          message: 'The user has been deleted'
        })
      } else {
        handleResponses.error({
          res,
          data,
          status: 404,
          message: 'User not found'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        data: error,
        status: 400,
        message: 'An error accurred while deleting the user'
      })
    })
}

module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  patchUser,
  deleteUser
}
