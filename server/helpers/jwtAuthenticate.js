import jwt from 'jsonwebtoken';
import User from '../models/user';
import handleError from './errorHandler';

class JwtAuthenticate {
  /**
   * @param  {Object} user
   * @return  {String} jwtEncode
   */
  static jwtEncode(user) {
    return jwt.sign(user, process.env.secret_key);
  }
  /**
   * @param  {ServerRequest} req
   * @param  {ServerResponse} res
   * @param  {ServerResponse} next
   * @return {Security} jwtVerifyToken
   */
  static jwtVerifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') {
      return handleError('No token is found!', 401, next);
    }
    const bearer = bearerHeader.split(' ');
    jwt.verify(bearer[1], process.env.secret_key, (err, user) => {
      if (err) {
        return handleError('You are not authorized', 401, next);
      }
      req.user = user;
      return next();
    });
  }

  /**
  * @param  {ServerRequest} req
   * @param  {ServerResponse} res
   * @param  {ServerResponse} next
   * @return {Boolean} isAdmin

   */
  static async isAdmin(req, res, next) {
    const bearerHeader = req.headers.authorization;
    const bearer = bearerHeader.split(' ');
    const bearerDetails = jwt.verify(bearer[1], process.env.secret_key);
    if (bearerDetails.isAdmin === false) {
      return handleError('Only Admin have access', 401, next);
    }
    return next();
  }
  /**
  * @param  {ServerRequest} req
   * @param  {ServerResponse} res
   * @param  {ServerResponse} next
   * @return {Boolean} isNotAdmin

   */
  static async isNotAdmin(req, res, next) {
    const bearerHeader = req.headers.authorization;
    const bearer = bearerHeader.split(' ');
    const bearerDetails = jwt.verify(bearer[1], process.env.secret_key);
    if (bearerDetails.isAdmin === true) {
      return handleError('Admin have no access', 401, next);
    }
    return next();
  }
}
export default JwtAuthenticate;
