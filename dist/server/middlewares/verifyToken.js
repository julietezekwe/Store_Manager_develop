'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var secret = process.env.SECRETE_KEY;

var verifyToken = function () {
  function verifyToken() {
    _classCallCheck(this, verifyToken);
  }

  _createClass(verifyToken, null, [{
    key: 'authenticate',

    /**
     * @description - Checks if the user authenticated
     * @param  {Object} req - request
     * @param  {object} res - response
     * @param {Object} next - Call back function
     * @return {object} - status code and error message or next()
     * @static
     * @memberof verifyToken
     */

    value: function authenticate(req, res, next) {
      var bearerHeader = req.headers.authorization;

      if (!bearerHeader) {
        return res.status(401).json({
          message: 'Kindly sign in',
          error: true
        });
      }
      _jsonwebtoken2.default.verify(bearerHeader, secret, function (err, authData) {
        if (err) {
          return res.status(401).json({
            message: 'Kindly sign in',
            error: true
          });
        }
        req.authData = authData;
        return true;
      });
      return next();
    }
  }]);

  return verifyToken;
}();

exports.default = verifyToken;