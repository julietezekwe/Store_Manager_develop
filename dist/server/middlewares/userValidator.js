'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userValidator = function () {
  function userValidator() {
    _classCallCheck(this, userValidator);
  }

  _createClass(userValidator, null, [{
    key: 'createUserChecker',

    /**
    * @description - Checks the request parameters for creating new user are of the right formart
    * @param  {Object} req - request
    * @param  {object} res - response
    * @param {Object} next - Call back function
    * @return {object} - status code and error message or next()
    * @static
    * @memberof userValidator
    */
    value: function createUserChecker(req, res, next) {
      req.check('name', 'Name is required').notEmpty();
      req.check('username', 'Username is required').notEmpty();
      req.check('email', 'Email is required').notEmpty();
      req.check('email', 'Email is not valid').isEmail();
      req.check('password', 'Password is required').notEmpty();
      req.check('role', 'Role is required').notEmpty();
      req.check('password', 'Minimum password length is 5 characters').isLength({ min: 5 });
      var errors = req.validationErrors();
      var validationErrors = [];
      if (errors) {
        errors.map(function (err) {
          return validationErrors.push(err.msg);
        });
        return res.status(400).json({
          errors: validationErrors
        });
      }
      var _req$body = req.body,
          name = _req$body.name,
          username = _req$body.username,
          email = _req$body.email,
          password = _req$body.password,
          role = _req$body.role;

      var fieldValues = [name, username, email, password, role];
      fieldValues.map(function (fieldValue) {
        if (fieldValue.trim() === '') {
          return res.status(400).json({
            message: 'Please fill in all fields',
            error: true
          });
        }
      });
      return next();
    }
    /**
    * @description - Checks the request parameters for login in users are of the right formart
    * @param  {Object} req - request
    * @param  {object} res - response
    * @param {Object} next - Call back function
    * @return {object} - status code and error message or next()
    * @static
    * @memberof userValidator
    */

  }, {
    key: 'userLoginChecker',
    value: function userLoginChecker(req, res, next) {
      req.check('username', 'Username is required').notEmpty();
      req.check('password', 'Password is required').notEmpty();
      req.check('password', 'Minimum password length is 5 characters').isLength({ min: 5 });

      var errors = req.validationErrors();
      var validationErrors = [];
      if (errors) {
        errors.map(function (err) {
          return validationErrors.push(err.msg);
        });
        return res.status(400).json({
          errors: validationErrors
        });
      }
      return next();
    }
  }]);

  return userValidator;
}();

exports.default = userValidator;