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
    req.check('sales', 'Only Jpeg, Png or Gif is accepted image format').isArray();

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      return res.status(400).json({
        errors: validationErrors,
      });
    }
    return next();
  }
}

export default SalesValidator;
