'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var verifyAttendant = function () {
  function verifyAttendant() {
    _classCallCheck(this, verifyAttendant);
  }

  _createClass(verifyAttendant, null, [{
    key: 'isAttendant',
    value: function isAttendant(req, res, next) {
      if (req.authData) {
        var role = req.authData.role;


        if (role !== 'attendant') {
          return res.status(401).json({
            message: 'You are not an Attendant',
            error: true
          });
        }
      }
      return next();
    }
  }]);

  return verifyAttendant;
}();

exports.default = verifyAttendant;