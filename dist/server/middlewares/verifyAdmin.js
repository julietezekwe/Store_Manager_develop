'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var verifyAdmin = function () {
  function verifyAdmin() {
    _classCallCheck(this, verifyAdmin);
  }

  _createClass(verifyAdmin, null, [{
    key: 'isAdmin',

    /**
    * @description - Checks if the authenticated user is admin
    * @param  {Object} req - request
    * @param  {object} res - response
    * @param {Object} next - Call back function
    * @return {object} - status code and error message or next()
    * @static
    * @memberof verifyAdmin
    */

    value: function isAdmin(req, res, next) {
      var role = req.authData.role;


      if (role !== 'admin') {
        return res.status(401).json({
          message: 'You are not an Admin',
          error: true
        });
      }
      return next();
    }
  }]);

  return verifyAdmin;
}();

exports.default = verifyAdmin;