'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var userValidator = {
  createUserChecker: function createUserChecker(req, res, next) {
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
    return next();
  },

  userLoginChecker: function userLoginChecker(req, res, next) {
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
};

exports.default = userValidator;