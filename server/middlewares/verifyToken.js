import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRETE_KEY;
class verifyToken {
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
      return true;
    });
    return next();
  }
}

export default verifyToken;
