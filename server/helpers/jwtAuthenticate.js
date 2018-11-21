import jwt from 'jsonwebtoken';
import User from '../models/user';

class JwtAuthenticate {
  static jwtEncode(userId) {
    return jwt.sign({ userId }, 'supersecret');
  }

  static jwtVerifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') {
      return res.status(403).json({
        success: false,
        error: 'You are not authorized',
      });
    }
    const bearer = bearerHeader.split(' ');
    jwt.verify(bearer[1], process.env.jwtcode, err => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: 'You are not authorized',
        });
      }
      return next();
    });
  }

  static isAdmin(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') {
      return res.status(403).json({
        success: false,
        error: 'You are not authorized',
      });
    }
    const bearer = bearerHeader.split(' ');
    jwt.verify(bearer[1], process.env.jwtcode, (err, authData) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: 'You are not authorized',
        });
      }
      User.findById(authData.userId, userDoc => {
        if (userDoc[0].is_admin === false) {
          return res.status(403).json({
            success: false,
            error: 'Only Admin have access',
          });
        }
        return next();
      });
    });
  }
}
export default JwtAuthenticate;
