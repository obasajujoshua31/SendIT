import User from '../models/user';
import Crypt from '../helpers/crypt';
import JwtAuthenticate from '../helpers/jwtAuthenticate';

class AuthController {
  static async signUpUser(req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const foundUser = await User.findOne(email);
      if (foundUser.length > 0) {
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
      const newRegisteredUser = await User.save(newUser);
      return res.status(201).json({
        success: true,
        token: JwtAuthenticate.jwtEncode(newRegisteredUser[0].user_id),
        message: 'user signed Up successfully',
        userObject: newRegisteredUser,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async signInUser(req, res, next) {
    const { email, password } = req.body;
    try {
      const foundUser = await User.findOne(email);
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
        userObject: foundUser,
      });
    } catch (e) {
      return next(e);
    }
  }
}

export default AuthController;
