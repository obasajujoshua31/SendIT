import User from '../models/user';
import Crypt from '../helpers/crypt';

class UserController {
  static getAllUsers(req, res, next) {
    User.getAll((err, foundUsers) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        success: true,
        data: foundUsers,
      });
    });
  }

  static postUserDetailsForVerification(req, res, next) {
    const { email, firstName } = req.body;
    User.findOne(email, (err, foundUserDetails) => {
      if (err) {
        return next(err);
      }
      if (foundUserDetails.length === 0) {
        const err1 = new Error();
        err1.message = 'There is a problem verifying your account';
        return next(err1);
      }
      if (
        foundUserDetails[0].first_name.toUpperCase() !== firstName.toUpperCase()
      ) {
        const err2 = new Error();
        err2.message = 'User Account Confirmation failed';
        return next(err2);
      }
      return res.status(200).json({
        success: true,
        message: 'User Account successfully verified',
      });
    });
  }

  static changeUserPassword(req, res, next) {
    const { email, password, passwordConfirmation } = req.body;
    if (password.toUpperCase() !== passwordConfirmation.toUpperCase()) {
      const err = new Error();
      err.message = 'Your password does not match';
      err.statusCode = 400;
      return next(err);
    }
    User.findOneAndUpdate(
      email,
      Crypt.encrypt(password),
      (err1, updatedUserRecord) => {
        if (err1) {
          return next(err1);
        }
        return res.status(200).json({
          success: true,
          data: updatedUserRecord,
          message: 'Password changed successfully',
        });
      }
    );
  }
}

export default UserController;
