const { logger } = require('../configs/logger');
const userModel = require('../models/users.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json({
      users
    });
  } catch (error) {
    logger.error('Error while making request :' + error);
    res.status(500).json({
      message: error
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.getUserById(id);
    if (user.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({
      user
    });
  } catch (error) {
    logger.error('Error while making request : ' + error);
    res.status(500).json({
      message: error
    });
  }
};

const addUser = async (req, res) => {
  try {
    const userData = req.body;
    await userModel.addUser(userData);
    res.status(200).json({
      message: 'User created Successfully'
    });
  } catch (error) {
    logger.error('Error while making request : ' + error);
    res.status(500).json({
      message: error
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userData = req.body;
    const updatedUser = await userModel.updateUser(req.params.id, userData);
    if (!updatedUser) {
      res.status(404).json({ message: 'Failed to update user.' });
      return;
    }
    res.status(200).json({
      message: 'User updated Successfully'
    });
  } catch (error) {
    logger.error('Error while making request : ' + error);
    res.status(500).json({
      message: error
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await userModel.deleteUser(id);
    if (!deletedUser) {
      res.status(404).json({ message: 'Failed to delete user.' });
      return;
    }
    res.status(200).json({
      message: 'User deleted Successfully'
    });
  } catch (error) {
    logger.error('Error while making request : ' + error);
    res.status(500).json({
      message: error
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
