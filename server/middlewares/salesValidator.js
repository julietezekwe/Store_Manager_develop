class salesValidator {
/**
 * @description - Checks the request parameters for creating sales records are of the right formart
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 * @memberof salesValidator
 */
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
