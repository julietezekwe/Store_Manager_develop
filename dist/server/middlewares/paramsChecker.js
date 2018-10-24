'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var paramsChecker = function () {
  function paramsChecker() {
    _classCallCheck(this, paramsChecker);
  }

  _createClass(paramsChecker, null, [{
    key: 'idChecker',

    /**
     * @description - Checks if the request parameters are valid numbers
     * @param  {Object} req - request
     * @param  {object} res - response
     * @param {Object} next - Call back function
     * @return {object} - status code and error message or next()
     * @static
     * @memberof paramsChecker
     */
    value: function idChecker(req, res, next) {
      var _req$params = req.params,
          userId = _req$params.userId,
          productId = _req$params.productId,
          salesId = _req$params.salesId;

      var validId = /^[0-9]+$/;
      // check if id is valid
      var checkParam = function checkParam(param) {
        if (!param.match(validId)) {
          return res.status(400).json({
            message: 'ID can only be a number',
            error: true
          });
        }
        return next();
      };
      if (userId) checkParam(userId);
      if (productId) checkParam(productId);
      if (salesId) checkParam(salesId);
    }
  }]);

  return paramsChecker;
}();

exports.default = paramsChecker;