const salesValidator = {
  addSalesValidator: (req, res, next) => {
    req.check('productId', 'Product ID is required').notEmpty();
    req.check('productName', 'Product name is required').notEmpty();
    req.check('prize', 'Unit Prize is required').notEmpty();
    req.check('quantity', 'Quantity is required').notEmpty();
    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      return res.status(400).json({
        errors: validationErrors,
      });
    }
    return next();
  },
};

export default salesValidator;
