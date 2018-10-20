import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UsersModel from '../dummyModel/UsersModel';

dotenv.config();

const secret = process.env.SECRETE_KEY;

/**
 *
 * @description Defines the actions to for the users endpoints
 * @class users
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
      UsersModel,
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
    UsersModel.map((user) => {
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
    UsersModel.map((user) => {
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
    let userExist = false;
    let userDetail;
    UsersModel.map((user) => {
      if (user.username === username) { userExist = true; }
      return true;
    });
    if (!userExist) {
      const hash = bcrypt.hashSync(password, 10);
      const id = UsersModel.length + 1;
      userDetail = { id, name, username, email, password: hash, role, created: new Date() };
      UsersModel.push(userDetail);
      return (
        res.status(201).json({ userDetail, message: 'User created successfully' })
      );
    }
    return (
      res.status(403).json({ message: 'Username is taken', error: true })
    );
  }
}

export default UsersController;
