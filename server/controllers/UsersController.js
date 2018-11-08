import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
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
    const query = {
      text: 'SELECT id, name, username, email, role, joined FROM Users',
    };
    pool.query(query).then((users) => {
      /* istanbul ignore next */if (users.rowCount > 0) {
        return res.status(200).json({
          UsersModel: users.rows,
          message: 'Success',
          error: false,
        });
      }
    }).catch(/* istanbul ignore next */ err => (
      res.status(500).json(err)
    ));
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
    const query = {
      text: 'SELECT * FROM Users Where id = $1',
      values: [userId],
    };
    pool.query(query).then((user) => {
      const { rowCount, rows } = user;
      if (rowCount > 0) {
        userDetail = rows[0];
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
    }).catch(/* istanbul ignore next */err => (
      res.status(500).json({
        err,
      })
    ));
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
    const { email, password } = req.body;
    let userDetail;
    const query = { text: 'SELECT * FROM users Where email = $1', values: [email] };
    pool.query(query).then((user) => {
      if (user.rowCount) {
        userDetail = user.rows[0];
        if (bcrypt.compareSync(password, userDetail.password)) {
          const { id, name, username, role, joined } = userDetail;
          const authDetail = {
            id, name, username, email, role, joined,
          };
          const token = jwt.sign(authDetail, secret, { expiresIn: '100hr' });

          return res.status(200).json({
            message: 'Successfully logged in',
            token,
            authDetail,
          });
        }
        return res.status(401).json({
          message: 'Invalid Credentials', error: true,
        });
      }
      return res.status(404).json({ message: 'User does not exist', error: true });
    }).catch(/* istanbul ignore next */ err => (
      res.status(500).json(err)
    ));
  }
  /**
  *Creats user
  *@description Creates a new user
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
    const roles = ['admin', 'attendant'].includes(role);
    if (!roles) return res.status(404).json({ message: 'This role does not exist' });
    pool.query({ text: 'SELECT email from Users where email = $1', values: [email] })
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
          return res.status(409).json({ message: 'email is taken', error: true });
        }
      }).catch(/* istanbul ignore next */ err => (
        res.status(500).json(err)
      ));
  }

  /**
  *Update user
  *@description Updates a category
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, message and the updated users detail
  *@memberof UsersController
  */

  static updateUser(req, res) {
    const { name, username, email, password, role } = req.body;
    const { userId } = req.params;
    let userDetail;
    const hash = bcrypt.hashSync(password, 10);
    pool.query({ text: 'SELECT id FROM Users WHERE id = $1', values: [userId] })
      .then((found) => {
        if (found.rowCount === 1) {
          pool.query({
            text: 'SELECT email FROM Users WHERE email = $1',
            values: [email],
          }).then((foundEmail) => {
            if (foundEmail.rowCount) return res.status(409).json({ message: 'This email is taken', error: true });
            const query = {
              text: 'UPDATE Users SET name = $1, username = $2, email = $3, password = $4, role = $5 WHERE id = $6 RETURNING *',
              values: [name, username, email, hash, role, userId],
            };
            pool.query(query).then((user) => {
              userDetail = user.rows[0];
              return res.status(200).json({ userDetail, message: 'User updated successfully' });
            });
          });
        } else {
          return res.status(404).json({ message: 'User does not exist', error: true });
        }
      }).catch(/* istanbul ignore next */err => (
        res.status(500).json(err)
      ));
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
    const query = {
      text: 'DELETE FROM Users Where id = $1',
      values: [userId],
    };
    pool.query(query).then((user) => {
      const { rowCount } = user;
      if (rowCount > 0) {
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
    }).catch(/* istanbul ignore next */err => (res.status(500).json(err)));
  }
}

export default UsersController;
