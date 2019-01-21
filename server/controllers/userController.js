import User from '../models/user';
import Crypt from '../helpers/crypt';
import JwtAuthenticate from '../helpers/jwtAuthenticate';

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const foundUsers = await User.getAll();
      return res.status(200).json({ success: true, data: foundUsers });
    } catch (e) {
      return next(e);
    }
  }

  static async postUserDetailsForVerification(req, res, next) {
    const { email, firstName } = req.body;
    try {
      const foundUserDetails = await User.findOne(email);
      if (foundUserDetails.length === 0) {
        const err1 = new Error();
        err1.message = 'There is a problem verifying your account';
        return next(err1);
      }
      const userDetails = await User.findOne(email);
      if (userDetails[0].first_name.toUpperCase() !== firstName.toUpperCase()) {
        const err2 = new Error();
        err2.message = 'User Account Confirmation failed';
        return next(err2);
      }
      return res.status(200).json({
        success: true,
        message: 'User Account successfully verified',
      });
    } catch (e) {
      return next(e);
    }
  }

  static async changeUserPassword(req, res, next) {
    const { email, password, passwordConfirmation } = req.body;
    if (password.toUpperCase() !== passwordConfirmation.toUpperCase()) {
      const err = new Error();
      err.message = 'Your password does not match';
      err.statusCode = 400;
      return next(err);
    }
    try {
      const updatedUserRecord = await User.findOneAndUpdate(
        email,
        Crypt.encrypt(password)
      );

      return res.status(200).json({
        success: true,
        data: updatedUserRecord,
        message: 'Password changed successfully',
        token: JwtAuthenticate.jwtEncode(updatedUserRecord[0].user_id),
      });
    } catch (e) {
      return next(e);
    }
  }
}

export default UserController;
