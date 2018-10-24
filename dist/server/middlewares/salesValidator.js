'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var salesValidator = function () {
  function salesValidator() {
    _classCallCheck(this, salesValidator);
  }

  _createClass(salesValidator, null, [{
    key: 'addSalesValidator',

    /**
     * @description - Checks the request parameters for creating sales records are of the right formart
     * @param  {Object} req - request
     * @param  {object} res - response
     * @param {Object} next - Call back function
     * @return {object} - status code and error message or next()
     * @static
     * @memberof salesValidator
     */
    value: function addSalesValidator(req, res, next) {
      req.check('productId', 'Product ID is required').notEmpty();
      req.check('productName', 'Product name is required').notEmpty();
      req.check('prize', 'Unit Prize is required').notEmpty();
      req.check('quantity', 'Quantity is required').notEmpty();
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
      var error = false;
      var _req$body = req.body,
          productId = _req$body.productId,
          productName = _req$body.productName,
          prize = _req$body.prize,
          quantity = _req$body.quantity;

      var fieldValues = [productId, productName, prize, quantity];
      fieldValues.map(function (fieldValue) {
        if (fieldValue.toString().trim() === '') {
          error = true;
        }
      });
      if (error) {
        return res.status(400).json({
          message: 'Please fill in all fields',
          error: true
        });
      }
      return next();
    }
  }]);

  return salesValidator;
}();

exports.default = salesValidator;