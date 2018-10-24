class VerifyAdmin {
  /**
 * @description - Checks if the authenticated user is admin
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 * @memberof VerifyAdmin
 */

  static isAdmin(req, res, next) {
    const { role } = req.authData;

    if (role !== 'admin') {
      return (
        res.status(401).json({
          message: 'You are not an Admin',
          error: true,
        })
      );
    }
    return next();
  }
}

export default VerifyAdmin;
