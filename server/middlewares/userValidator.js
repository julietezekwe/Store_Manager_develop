import ErrorBag from '../error';

const userValidator = {
  createUserChecker: (req, res, next) => {
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
        errors: new ErrorBag(errors),
      });
    }
    const {
      name, username, email, password, role,
    } = req.body;
    const fieldValues = [name, username, email, password, role];
    fieldValues.map((fieldValue) => {
      if (fieldValue.trim() === '') {
        return res.status(400).json({
          message: 'Please fill in all fields',
          error: true,
        });
      }
    });
    return next();
  },

  userLoginChecker: (req, res, next) => {
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
        errors: new ErrorBag(errors),
      });
    }
    return next();
  },
};

export default userValidator;
