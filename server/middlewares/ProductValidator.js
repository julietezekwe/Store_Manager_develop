class ProductValidator {
  /**
 * @description - Checks the request parameters for creating new product are of the right formart
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 * @memberof ProductValidator
 */

  static addProductValidator(req, res, next) {
    const {
      productName, description, image, price, quantity, min,
    } = req.body;
    req.check('productName', 'Product name is required').notEmpty();
    req.check('description', 'Description is required').notEmpty();
    req.check('description', 'Description should be more than 5 words')
      .isLength({ min: 15 });
    req.check('image', 'Image is required').notEmpty();
    req.check('image', 'Only Jpeg, Png or Gif is accepted image format').isImage(req.body.image);
    req.check('price', 'Unit price is required and must be integer').notEmpty().isInt();
    req.check('quantity', 'Quantity is required and must be integer').notEmpty().isInt();
    req.check('min', 'Minimum inventory is required and must be integer').notEmpty().isInt();

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      return res.status(400).json({
        errors: validationErrors,
        error: true,
      });
    }
    let error = false;
    const fieldValues = [productName, description, image, price, quantity, min];
    fieldValues.map((fieldValue) => {
      if (fieldValue.trim() === '') {
        error = true;
      }
    });
    if (error) {
      return res.status(400).json({
        message: 'Please fill in all fields',
        error: true,
      });
    }
    req.body.productName = productName.replace(/\s{2,}/g, ' ').trim();
    return next();
  }

  /**
 * @description - Checks the request parameters for adding product to a category are correct
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 * @memberof ProductValidator
 */

  static productCategoryValidator(req, res, next) {
    const { categoryName } = req.body;

    req.check('categoryName', 'Category name is required').notEmpty();

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      return res.status(400).json({
        errors: validationErrors,
        error: true,
      });
    }

    if (categoryName.trim() === '') {
      return res.status(400).json({
        message: 'Please fill in all fields',
        error: true,
      });
    }
    return next();
  }
}

export default ProductValidator;
