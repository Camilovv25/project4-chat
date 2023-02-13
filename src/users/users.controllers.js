const Users = require('../models/users.models')

const findAllUsers = async() => {
  const data = await Users.findAll();
  return data
}

const findUserById = async (id) => {
  const data = await Users.findOne({
    where: {id}
  });
  return data 
}

const createNewUser = async (userOBj) => {
  const newUser = {
    id: userOBj.id,
    profileImg: userOBj.profileImg,
    name: userOBj.name,
    createdBy: userOBj.createdBy,
    isGroup: userOBj.isGroup
  }
  const data = await Users.create(newUser)
  return data 
}

const updateUser = async (id, userOBj) => {
  const data = await Users.update(userOBj, {
    where: {id}
  })
  return data[0]
}

const deleteUser = async (id)=> {
  const data = await Users.destroy({
    where: {id}
  })
  return data 
}

module.exports = {
  findAllUsers,
  findUserById,
  createNewUser,
  updateUser,
  deleteUser
}