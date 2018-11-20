import User from '../models/user';
import Crypt from '../helpers/crypt';
import JwtAuthenticate from '../helpers/jwtAuthenticate';

class AuthController {
  static signUpUser(req, res) {
    const { firstName, lastName, email, password } = req.body;

    User.findOne(email, results => {
      if (results.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Email is already used',
        });
      }

      const newUser = {
        firstName,
        lastName,
        email,
        password: Crypt.encrypt(password),
        isAdmin: false,
      };
      User.save(newUser, theuser => {
        return res.status(201).json({
          success: true,
          data: theuser,
          message: 'user signed Up successfully',
        });
      });
    });
  }

  static signInUser(req, res) {
    const { email, password } = req.body;
    User.findOne(email, userDoc => {
      if (userDoc.length === 0) {
        res.status(404).json({
          success: false,
          error: 'User has no account',
        });
      } else if (Crypt.isMatchDbPassword(password, userDoc[0].password)) {
        res.status(200).json({
          success: true,
          token: JwtAuthenticate.jwtEncode(userDoc[0].user_id),
        });
      } else {
        res.status(400).json({
          success: false,
          error: 'Password incorrect',
        });
      }
    });
  }
}

export default AuthController;
