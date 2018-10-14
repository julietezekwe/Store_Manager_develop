import UsersModel from '../dummyModel/UsersModel';

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
    let userDetail;
    UsersModel.map((user) => {
      if (user.username === username && user.password === password) {
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
      res.status(401).json({
        message: 'Invalid Credentials',
        error: true,
      })
    );
  }

  static createUser(req, res) {
    const {
      name, username, password, role,
    } = req.body;
    let userExist = false;
    let userDetail;
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
      const id = UsersModel.length + 1;
      userDetail = {
        id,
        name,
        username,
        password,
        role,
        created: new Date(),
      };
      UsersModel.push(userDetail);
      return (
        res.status(201).json({
          userDetail,
          message: 'Success',
          error: false,
        })
      );
    }
    return true;
  }
}

export default Users;
