const db = require('../configs/db');
const { logger } = require('../configs/logger');

const getAllUsers = async () => {
  try {
    const query = 'SELECT * FROM users';
    const [rows] = await db.query(query);
    logger.info('user data retrieved successfully from db.');
    return rows;
  } catch (err) {
    logger.error('Error while retrieving users from db : ' + err);
  }
};

const getUserById = async (id) => {
  try {
    const query = 'SELECT * FROM users WHERE id = ?';
    const values = [id];
    const [rows] = await db.query(query, values);
    logger.info('user data retrieved successfully from db.');
    return rows;
  } catch (error) {
    logger.error('Error while retrieving users from db : ' + error);
  }
};

const addUser = async (userData) => {
  try {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const values = [userData.name, userData.email, userData.password];
    const [rows] = await db.query(query, values);
    logger.info('user data created successfully in db.');
    return rows;
  } catch (error) {
    logger.error('Error while creating user in db : ' + error);
  }
};

const updateUser = async (id, userData) => {
  try {
    const query = 'UPDATE users SET name = ? WHERE id = ?';
    const values = [userData.name, id];
    const [result] = await db.query(query, values);
    if (result.affectedRows > 0) {
      logger.info('user data updated successfully in db.');
      return true;
    }
    return false;
  } catch (error) {
    logger.error('Error while updating user in db : ' + error);
  }
};

const deleteUser = async (id) => {
  try {
    const query = 'DELETE FROM users WHERE id = ?';
    const values = [id];
    const [result] = await db.query(query, values);
    if (result.affectedRows > 0) {
      logger.info('user data deleted successfully in db.');
      return true;
    }
    return false;
  } catch (error) {
    logger.error('Error while deleting user in db : ' + error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
