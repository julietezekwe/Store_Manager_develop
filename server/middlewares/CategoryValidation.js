class CategoryValidator {
  /**
   * @description - Checks the request parameters for creating new product are of the right formart
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - status code and error message or next()
   * @static
   * @memberof ProductValidator
   */

  static addCategoryValidator(req, res, next) {
    req.check('categoryName', 'Category Name is required').notEmpty();
    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      return res.status(400).json({
        errors: validationErrors,
        error: true,
      });
    }
    const categoryName = req.body.categoryName;
    if (categoryName.trim() === '') {
      return res.status(400).json({
        message: 'Please fill in all fields',
        error: true,
      });
    }
    req.body.categoryName = categoryName.replace(/\s{2,}/g, ' ').trim();
    return next();
  }
}

export default CategoryValidator;
