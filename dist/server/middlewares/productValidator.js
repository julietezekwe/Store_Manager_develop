'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var productValidator = {
  addProductValidator: function addProductValidator(req, res, next) {
    req.check('productName', 'Product name is required').notEmpty();
    req.check('description', 'Description is required').notEmpty();
    req.check('description', 'Description should be more than 5 words').isLength({ min: 15 });
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
    return next();
  }
};

exports.default = productValidator;