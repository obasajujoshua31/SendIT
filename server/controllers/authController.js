import User from '../models/user';
import Crypt from '../helpers/crypt';
import JwtAuthenticate from '../helpers/jwtAuthenticate';

class AuthController {
  static signUpUser(req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    User.findOne(email, (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.length > 0) {
        const err2 = new Error();
        err2.statusCode = 400;
        err2.message = 'Email is not available';
        return next(err2);
      }
      const newUser = {
        firstName,
        lastName,
        email,
        password: Crypt.encrypt(password),
        isAdmin: false,
      };
      User.save(newUser, (e, newRegisteredUser) => {
        if (e) {
          return next(e);
        }
        return res.status(201).json({
          success: true,
          token: JwtAuthenticate.jwtEncode(newRegisteredUser[0].user_id),
          message: 'user signed Up successfully',
        });
      });
    });
  }

  static signInUser(req, res, next) {
    console.log('request body', req.body);
    const { email, password } = req.body;

    User.findOne(email, (err, foundUser) => {
      if (err) {
        return next(err);
      }
      if (foundUser.length === 0) {
        const err2 = new Error();
        err2.message = 'Invalid Password or Username';
        err2.statusCode = 400;
        return next(err2);
      }
      if (!Crypt.isMatchDbPassword(password, foundUser[0].password)) {
        const err3 = new Error();
        err3.message = 'Invalid Password or Username';
        err3.statusCode = 400;
        return next(err3);
      }
      return res.status(200).json({
        success: true,
        token: JwtAuthenticate.jwtEncode(foundUser[0].user_id),
      });
    });
  }
}

export default AuthController;
