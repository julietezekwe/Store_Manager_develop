'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _UsersModel = require('../dummyModel/UsersModel');

var _UsersModel2 = _interopRequireDefault(_UsersModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var secret = process.env.SECRETE_KEY;

/**
 * @description Defines the actions to for the users endpoints
 * @class UsersController
 */

var UsersController = function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, null, [{
    key: 'getAllUsers',

    /**
      *Gets all Users
      *@description Retrieves all the users from the data source
      *@static
      *@param  {Object} req - request
      *@param  {object} res - response
      *@return {object} - status code, message and all existing users
      *@memberof UsersController
      */

    value: function getAllUsers(req, res) {
      res.status(200).json({
        UsersModel: _UsersModel2.default,
        message: 'Success',
        error: false
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

  }, {
    key: 'getUser',
    value: function getUser(req, res) {
      var userId = req.params.userId;

      var userDetail = void 0;
      var found = false;
      _UsersModel2.default.map(function (user) {
        if (Number(userId) === user.id) {
          userDetail = user;
          found = true;
        }
        return false;
      });
      if (found) {
        return res.status(200).json({
          userDetail: userDetail,
          message: 'Success',
          error: false
        });
      }
      return res.status(404).json({
        message: 'No user found',
        error: true
      });
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

  }, {
    key: 'loginUser',
    value: function loginUser(req, res) {
      var _req$body = req.body,
          username = _req$body.username,
          password = _req$body.password;

      var authDetail = void 0;
      var found = false;
      _UsersModel2.default.map(function (user) {
        if (user.username === username && _bcryptjs2.default.compareSync(password, user.password)) {
          var id = user.id,
              name = user.name,
              email = user.email,
              role = user.role,
              created = user.created;

          authDetail = { id: id, name: name, username: username, email: email, role: role, created: created };
          found = true;
        }
        return false;
      });
      if (found) {
        var token = _jsonwebtoken2.default.sign(authDetail, secret, { expiresIn: '1hr' });
        return res.status(200).json({
          authDetail: authDetail, token: token, message: 'Success', error: false
        });
      }
      return res.status(401).json({
        message: 'Invalid Credentials', error: true
      });
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

  }, {
    key: 'createUser',
    value: function createUser(req, res) {
      var _req$body2 = req.body,
          name = _req$body2.name,
          username = _req$body2.username,
          email = _req$body2.email,
          password = _req$body2.password,
          role = _req$body2.role;

      var userExist = false;
      var userDetail = void 0;
      _UsersModel2.default.map(function (user) {
        if (user.username === username) {
          userExist = true;
        }
        return true;
      });
      if (!userExist) {
        var hash = _bcryptjs2.default.hashSync(password, 10);
        var id = _UsersModel2.default.length + 1;
        userDetail = { id: id, name: name, username: username, email: email, password: hash, role: role, created: new Date() };
        _UsersModel2.default.push(userDetail);
        return res.status(201).json({ userDetail: userDetail, message: 'User created successfully' });
      }
      return res.status(403).json({ message: 'Username is taken', error: true });
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

  }, {
    key: 'updateUser',
    value: function updateUser(req, res) {
      var userId = req.params.userId;
      var _req$body3 = req.body,
          name = _req$body3.name,
          username = _req$body3.username,
          email = _req$body3.email,
          password = _req$body3.password,
          role = _req$body3.role;

      var userExist = false;
      var userIndex = void 0;
      var userDetail = void 0;
      _UsersModel2.default.map(function (user, index) {
        if (user.id === Number(userId)) {
          userExist = true;userIndex = index;
        }
        return true;
      });
      if (userExist) {
        var hash = _bcryptjs2.default.hashSync(password, 10);
        var id = _UsersModel2.default[userIndex].id;

        userDetail = { id: id, name: name, username: username, email: email, password: hash, role: role, created: new Date() };
        _UsersModel2.default[userIndex] = userDetail;
        return res.status(201).json({ userDetail: userDetail, message: 'User updated successfully' });
      }
      return res.status(404).json({ message: 'User does not exist', error: true });
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

  }, {
    key: 'deleteUser',
    value: function deleteUser(req, res) {
      var userId = req.params.userId;

      var found = false;
      var userIndex = void 0;
      _UsersModel2.default.map(function (user, index) {
        if (Number(userId) === user.id) {
          userIndex = index;
          found = true;
        }
        return false;
      });
      if (found) {
        _UsersModel2.default.splice(userIndex, 1);
        return res.status(200).json({
          message: 'Successfully deleted user',
          error: false
        });
      }
      return res.status(404).json({
        message: 'User does not exist',
        error: true
      });
    }
  }]);

  return UsersController;
}();

exports.default = UsersController;