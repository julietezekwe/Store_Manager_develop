class paramsChecker {
/**
 * @description - Checks if the request parameters are valid numbers
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 * @memberof paramsChecker
 */
  static idChecker(req, res, next) {
    const { userId, productId, salesId } = req.params;
    const validId = /^[0-9]+$/;
    // check if id is valid
    const checkParam = (param) => {
      if (!param.match(validId)) {
        return res.status(400).json({
          message: 'ID can only be a number',
          error: true,
        });
      }
      return next();
    };
    if (userId) checkParam(userId);
    if (productId) checkParam(productId);
    if (salesId) checkParam(salesId);
  }
}

export default paramsChecker;
