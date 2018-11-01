class SalesValidator {
/**
 * @description - Checks the request parameters for creating sales records are of the right formart
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 * @memberof SalesValidator
 */
  static addSalesValidator(req, res, next) {
    req.check('sales', 'Please provide products to sale').isArray().isLength({ min: 1 });
    req.checkBody('sales.*.productId', 'Product ID is required').exists();
    req.checkBody('sales.*.productName', 'Product Name is required').exists();
    req.checkBody('sales.*.quantity', 'Product Quantity is required and Must be an Integer').exists().isInt();
    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      return res.status(400).json({
        errors: validationErrors,
      });
    }
    const { sales } = req.body;
    let error = false;
    sales.forEach((sale) => {
      const {
        productId, productName, quantity,
      } = sale;
      const fieldValues = [productId, productName, quantity];
      fieldValues.map((fieldValue) => {
        if (fieldValue.toString().trim() === '') {
          error = true;
        }
      });
    });
    if (error) {
      return res.status(400).json({
        message: 'Please fill in all fields',
        error: true,
      });
    }
    return next();
  }
}

export default SalesValidator;
