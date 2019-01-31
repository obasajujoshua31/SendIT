import User from '../models/user';
import Crypt from '../helpers/crypt';
import JwtAuthenticate from '../helpers/jwtAuthenticate';
import handleError from '../helpers/errorHandler';
import { sendAuthResponse } from '../helpers/response';
class AuthController {
  static async signUpUser(req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const foundUser = await User.findOne(email);
      if (foundUser.length > 0) {
        return handleError('Email is not available', 400, next);
      }
      const newUser = {
        firstName,
        lastName,
        email,
        password: Crypt.encrypt(password),
        isAdmin: false,
      };
      const newRegisteredUser = await User.save(newUser);
      const { userId, dbPassword } = newRegisteredUser[0];
      const user = {
        firstName,
        lastName,
        email,
        password: dbPassword,
        userId,
        isAdmin: false,
      };
      return sendAuthResponse(
        JwtAuthenticate.jwtEncode(user),
        'user signed up successfully',
        201,
        res
      );
    } catch (e) {
      return next(e);
    }
  }

  static async signInUser(req, res, next) {
    try {
      const foundUser = await User.findOne(req.body.email);
      if (foundUser.length === 0) {
        return handleError('Invalid Password or Username', 400, next);
      }
      if (!Crypt.isMatchDbPassword(req.body.password, foundUser[0].password)) {
        return handleError('Invalid Password or Username', 400, next);
      }
      const { user_id, email, first_name, last_name, is_admin } = foundUser[0];
      const user = {
        userId: user_id,
        email,
        firstName: first_name,
        lastName: last_name,
        isAdmin: is_admin,
      };
      return sendAuthResponse(
        JwtAuthenticate.jwtEncode(user),
        'User signed in successfully',
        200,
        res,
        user
      );
    } catch (e) {
      return next(e);
    }
  }

  static async signUpUserByAdmin(req, res, next) {
    const { email, password, firstName, lastName, isAdmin } = req.body;
    try {
      const foundUser = await User.findOne(email);
      if (foundUser.length > 0) {
        return handleError('Email is not available', 400, next);
      }
      const newUser = {
        firstName,
        lastName,
        email,
        password: Crypt.encrypt(password),
        isAdmin,
      };
      const newRegisteredUser = await User.save(newUser);
      const { userId } = newRegisteredUser[0];
      const dbPassword = newRegisteredUser[0].password;
      const user = {
        firstName,
        lastName,
        email,
        password: dbPassword,
        userId,
        isAdmin,
      };
      return sendAuthResponse(
        JwtAuthenticate.jwtEncode(user),
        'user signed up successfully',
        201,
        res
      );
    } catch (e) {
      return next(e);
    }
  }
}
export default AuthController;
