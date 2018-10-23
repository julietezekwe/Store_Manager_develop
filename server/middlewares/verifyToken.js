import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRETE_KEY;
class verifyToken {
/**
 * @description - Checks if the user authenticated
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 * @memberof verifyToken
 */

  static authenticate(req, res, next) {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
      return res.status(401).json({
        message: 'Kindly sign in',
        error: true,
      });
    }
    jwt.verify(bearerHeader, secret, (err, authData) => {
      if (err) {
        return res.status(401).json({
          message: 'Kindly sign in',
          error: true,
        });
      }
      req.authData = authData;
      return next();
    });
  }
}

export default verifyToken;
