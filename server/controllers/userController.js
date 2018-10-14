import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UsersModel from '../dummyModel/UsersModel';

dotenv.config();

const secret = process.env.SECRETE_KEY;

class Users {
  static getAllUsers(req, res) {
    res.status(201).json({
      UsersModel,
      message: 'Success',
      error: false,
    });
  }

  static getUser(req, res) {
    const { userId } = req.params;
    let userDetail;
    UsersModel.map((user) => {
      if (Number(userId) === user.id) {
        userDetail = user;
        return (
          res.status(200).json({
            userDetail,
            message: 'Success',
            error: false,
          })
        );
      }
      return false;
    });
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
    UsersModel.map((user) => {
      if (user.username === username && bcrypt.compareSync(password, user.password)) {
        const {
          id, name, email, role, created,
        } = user;
        authDetail = {
          id,
          name,
          username,
          email,
          role,
          created,
        };
        const token = jwt.sign(authDetail, secret, { expiresIn: '1hr' });
        return (
          res.status(200).json({
            authDetail,
            token,
            message: 'Success',
            error: false,
          })
        );
      }
      return false;
    });
    return (
      res.status(401).json({
        message: 'Invalid Credentials',
        error: true,
      })
    );
  }

  static createUser(req, res) {
    const creatorRole = req.authData.role;
    const {
      name, username, email, password, role,
    } = req.body;
    let userExist = false;
    let userDetail;

    if (creatorRole !== 'admin') {
      return (
        res.status(401).json({
          message: 'Only Admin can create users',
          error: true,
        })
      );
    }
    UsersModel.map((user) => {
      if (user.username === username) {
        userExist = true;
        return (
          res.status(403).json({
            message: 'Username is taken',
            error: true,
          })
        );
      }
      return true;
    });
    if (!userExist) {
      const hash = bcrypt.hashSync(password, 10);
      const id = UsersModel.length + 1;
      userDetail = {
        id,
        name,
        username,
        email,
        password: hash,
        role,
        created: new Date(),
      };
      UsersModel.push(userDetail);
      return (
        res.status(201).json({
          userDetail,
          message: 'User created successfully',
          error: false,
        })
      );
    }
    return true;
  }
}

export default Users;
