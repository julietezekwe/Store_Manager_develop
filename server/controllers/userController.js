import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UsersModel from '../dummyModel/UsersModel';

dotenv.config();

const secret = process.env.SECRETE_KEY;

class Users {
  static getAllUsers(req, res) {
    res.status(200).json({
      UsersModel,
      message: 'Success',
      error: false,
    });
  }

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

export default Users;
