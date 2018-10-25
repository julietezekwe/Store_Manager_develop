import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import usersModel from '../dummyModel/usersModel';
import pool from '../model/dbConfig';

dotenv.config();

const secret = process.env.SECRETE_KEY;

/**
 * @description Defines the actions to for the users endpoints
 * @class UsersController
 */

class UsersController {
  /**
    *Gets all Users
    *@description Retrieves all the users from the data source
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code, message and all existing users
    *@memberof UsersController
    */

  static getAllUsers(req, res) {
    res.status(200).json({
      usersModel,
      message: 'Success',
      error: false,
    });
  }
  /**
  *Gets User
  *@description Retrieves a user by id
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, message and the retrieved user detail
  *@memberof UsersController
  */

  static getUser(req, res) {
    const { userId } = req.params;
    let userDetail;
    let found = false;
    usersModel.map((user) => {
      if (Number(userId) === user.id) {
        userDetail = user;
        found = true;
      }
      return false;
    });
    if (found) {
      return (
        res.status(200).json({
          userDetail,
          message: 'Success',
          error: false,
        })
      );
    }
    return (
      res.status(404).json({
        message: 'No user found',
        error: true,
      })
    );
  }
  /**
  *Login user
  *@description Logins in an existing user
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, message and the authentication detail
  *@memberof UsersController
  */

  static loginUser(req, res) {
    const { username, password } = req.body;
    let authDetail;
    let found = false;
    usersModel.map((user) => {
      if (user.username === username && bcrypt.compareSync(password, user.password)) {
        const { id, name, email, role, created } = user;
        authDetail = { id, name, username, email, role, created };
        found = true;
      }
      return false;
    });
    if (found) {
      const token = jwt.sign(authDetail, secret, { expiresIn: '1hr' });
      return (
        res.status(200).json({
          authDetail, token, message: 'Success', error: false,
        })
      );
    }
    return (
      res.status(401).json({
        message: 'Invalid Credentials', error: true,
      })
    );
  }
  /**
  *Creats user
  *@description Creates a new product
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, message and the new users detail
  *@memberof UsersController
  */

  static createUser(req, res) {
    const { name, username, email, password, role } = req.body;
    let userDetail;
    const hash = bcrypt.hashSync(password, 10);
    pool.query({ text: 'SELECT username from Users where username = $1', values: [username] })
      .then((found) => {
        if (found.rowCount === 0) {
          const query = {
            text: 'INSERT INTO Users(name, username, email, password, role) VALUES($1, $2, $3, $4, $5) RETURNING *',
            values: [name, username, email, hash, role],
          };
          pool.query(query).then((user) => {
            userDetail = user.rows[0];
            return res.status(201).json({ userDetail, message: 'User created successfully' });
          });
        } else {
          return res.status(403).json({ message: 'Username is taken', error: true });
        }
      }).catch(err => (
        res.status(500).json(err)
      ));
  }

  /**
  *Update user
  *@description Creates a new product
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, message and the updated users detail
  *@memberof UsersController
  */

  static updateUser(req, res) {
    const { userId } = req.params;
    const { name, username, email, password, role } = req.body;
    let userExist = false;
    let userIndex;
    let userDetail;
    usersModel.map((user, index) => {
      if (user.id === Number(userId)) { userExist = true; userIndex = index; }
      return true;
    });
    if (userExist) {
      const hash = bcrypt.hashSync(password, 10);
      const { id } = usersModel[userIndex];
      userDetail = { id, name, username, email, password: hash, role, created: new Date() };
      usersModel[userIndex] = userDetail;
      return (
        res.status(201).json({ userDetail, message: 'User updated successfully' })
      );
    }
    return (
      res.status(404).json({ message: 'User does not exist', error: true })
    );
  }

  /**
  *Deletes User
  *@description Deletes a user by id
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code and message
  *@memberof UsersController
  */

  static deleteUser(req, res) {
    const { userId } = req.params;
    let found = false;
    let userIndex;
    usersModel.map((user, index) => {
      if (Number(userId) === user.id) {
        userIndex = index;
        found = true;
      }
      return false;
    });
    if (found) {
      usersModel.splice(userIndex, 1);
      return (
        res.status(200).json({
          message: 'Successfully deleted user',
          error: false,
        })
      );
    }
    return (
      res.status(404).json({
        message: 'User does not exist',
        error: true,
      })
    );
  }
}

export default UsersController;
