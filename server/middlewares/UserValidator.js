class UserValidator {
  /**
 * @description - Checks the request parameters for creating new user are of the right formart
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 * @memberof UserValidator
 */
  static createUserChecker(req, res, next) {
    req.check('name', 'Name is required').notEmpty();
    req.check('username', 'Username is required').notEmpty();
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Email is not valid').isEmail();
    req.check('password', 'Password is required').notEmpty();
    req.check('role', 'Role is required').notEmpty();
    req.check('password', 'Minimum password length is 5 characters')
      .isLength({ min: 5 });
    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      return res.status(400).json({
        errors: validationErrors,
      });
    }
    const {
      name, username, email, password, role,
    } = req.body;
    let error = false;
    const fieldValues = [name, username, email, password, role];
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
    req.body.username = username.replace(/\s{2,}/g, '').trim().toLowerCase();
    req.body.password = password.replace(/\s{2,}/g, '').trim().toLowerCase();
    return next();
  }
  /**
 * @description - Checks the request parameters for login in users are of the right formart
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 * @memberof UserValidator
 */

  static userLoginChecker(req, res, next) {
    const { username, password } = req.body;
    req.check('username', 'Username is required').notEmpty();
    req.check('password', 'Password is required').notEmpty();
    req
      .check('password', 'Minimum password length is 5 characters')
      .isLength({ min: 5 });

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      return res.status(400).json({
        errors: validationErrors,
      });
    }
    req.body.username = username.replace(/\s{2,}/g, '').trim().toLowerCase();
    req.body.password = password.replace(/\s{2,}/g, '').trim().toLowerCase();
    return next();
  }
}

export default UserValidator;
