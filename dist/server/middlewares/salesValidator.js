'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var salesValidator = {
  addSalesValidator: function addSalesValidator(req, res, next) {
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
    return next();
  }
};

exports.default = salesValidator;