'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var productValidator = function () {
  function productValidator() {
    _classCallCheck(this, productValidator);
  }

  _createClass(productValidator, null, [{
    key: 'addProductValidator',

    /**
    * @description - Checks the request parameters for creating new product are of the right formart
    * @param  {Object} req - request
    * @param  {object} res - response
    * @param {Object} next - Call back function
    * @return {object} - status code and error message or next()
    * @static
    * @memberof productValidator
    */

    value: function addProductValidator(req, res, next) {
      req.check('productName', 'Product name is required').notEmpty();
      req.check('description', 'Description is required').notEmpty();
      req.check('description', 'Description should be more than 5 words').isLength({ min: 15 });
      req.check('image', 'Image is required').notEmpty();
      req.check('prize', 'Unit Prize is required').notEmpty();
      req.check('quantity', 'Quantity is required').notEmpty();
      req.check('min', 'Minimum inventory is required').notEmpty();
      req.check('category', 'Category is required').notEmpty();

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
          productName = _req$body.productName,
          description = _req$body.description,
          image = _req$body.image,
          prize = _req$body.prize,
          quantity = _req$body.quantity,
          min = _req$body.min,
          category = _req$body.category;

      var fieldValues = [productName, description, image, prize, quantity, min, category];
      fieldValues.map(function (fieldValue) {
        if (fieldValue.toString().trim() === '') {
          return res.status(400).json({
            message: 'Please fill in all fields',
            error: true
          });
        }
      });
      return next();
    }
  }]);

  return productValidator;
}();

exports.default = productValidator;