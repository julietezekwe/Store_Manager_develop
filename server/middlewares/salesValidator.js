class salesValidator {
  static addSalesValidator(req, res, next) {
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
    const {
      productId, productName, prize, quantity,
    } = req.body;
    const fieldValues = [productId, productName, prize, quantity];
    fieldValues.map((fieldValue) => {
      if (fieldValue.toString().trim() === '') {
        return res.status(400).json({
          message: 'Please fill in all fields',
          error: true,
        });
      }
    });
    return next();
  }
}

export default salesValidator;
