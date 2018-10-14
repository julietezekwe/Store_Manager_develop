import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRETE_KEY;
class verifyToken {
  static authenticate(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
      // Forbidden
      return res.status(401).json({
        message: 'Kindly sign in',
        error: true,
      });
    }
    // req.token = bearerHeader;

    jwt.verify(bearerHeader, secret, (err, authData) => {
      if (err) {
        // Wrong token

        return res.status(401).json({
          message: 'Kindly sign in',
          error: true,
        });
      }
      req.authData = authData;
      return true;
      //   = authData;
    });
    return next();
  }
}

export default verifyToken;
