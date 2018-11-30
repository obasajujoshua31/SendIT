import jwt from 'jsonwebtoken';
import User from '../models/user';

class JwtAuthenticate {
  static jwtEncode(userId) {
    return jwt.sign({ userId }, 'great_is_him');
  }

  static jwtVerifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') {
      return res.status(401).json({
        success: false,
        error: 'You are not authorized',
      });
    }
    const bearer = bearerHeader.split(' ');
    jwt.verify(bearer[1], 'great_is_him', err => {
      if (err) {
        return res.status(401).json({
          success: false,
          error: 'You are not authorized',
        });
      }
      return next();
    });
  }

  static isAdmin(req, res, next) {
    const bearerHeader = req.headers.authorization;
    const bearer = bearerHeader.split(' ');
    const bearerDetails = jwt.verify(bearer[1], 'great_is_him');
    User.findById(bearerDetails.userId, foundUserDetails => {
      if (foundUserDetails[0].is_admin === false) {
        return res.status(401).json({
          success: false,
          error: 'Only Admin have access',
        });
      }
      return next();
    });
  }
}
export default JwtAuthenticate;
