import jwt from 'jsonwebtoken';
import User from '../models/user';

class JwtAuthenticate {
  static jwtEncode(userId) {
    return jwt.sign({ userId }, process.env.secret_key);
  }

  static jwtVerifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') {
      const err = new Error();
      err.statusCode = 401;
      err.message = 'You are not authorized';
      return next(err);
    }
    const bearer = bearerHeader.split(' ');
    jwt.verify(bearer[1], process.env.secret_key, err => {
      if (err) {
        const err2 = new Error();
        err2.statusCode = 401;
        err2.message = 'You are not authorized';
        return next(err2);
      }
      return next();
    });
  }

  static isAdmin(req, res, next) {
    const bearerHeader = req.headers.authorization;
    const bearer = bearerHeader.split(' ');
    const bearerDetails = jwt.verify(bearer[1], process.env.secret_key);
    User.findById(bearerDetails.userId, (err, foundUserDetails) => {
      if (err) {
        return next(err);
      }
      if (foundUserDetails.length === 0) {
        const err1 = new Error();
        err1.statusCode = 404;
        err1.message = 'User not found';
        return next(err1);
      }
      if (foundUserDetails[0].is_admin === false) {
        const err2 = new Error();
        err2.statusCode = 401;
        err2.message = 'Only Admin have access';
        return next(err2);
      }
      return next();
    });
  }

  static isNotAdmin(req, res, next) {
    const bearerHeader = req.headers.authorization;
    const bearer = bearerHeader.split(' ');
    const bearerDetails = jwt.verify(bearer[1], process.env.secret_key);
    User.findById(bearerDetails.userId, (err, foundUserDetails) => {
      if (err) {
        return next(err);
      }
      if (foundUserDetails.length === 0) {
        const err1 = new Error();
        err1.statusCode = 404;
        err1.message = 'User not found';
        return next(err1);
      }
      if (foundUserDetails[0].is_admin === true) {
        const err2 = new Error();
        err2.statusCode = 401;
        err2.message = 'Admin cannot cancel an order';
        return next(err2);
      }
      return next();
    });
  }
}
export default JwtAuthenticate;
