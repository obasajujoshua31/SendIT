import User from '../models/user';
import Crypt from '../helpers/crypt';
import JwtAuthenticate from '../helpers/jwtAuthenticate';

class AuthController {
  static signUpUser(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
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
        User.save(newUser, newRegisteredUser => {
          return res.status(201).json({
            success: true,
            token: JwtAuthenticate.jwtEncode(newRegisteredUser[0].user_id),
            message: 'user signed Up successfully',
          });
        });
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected results',
      });
    }
  }

  static signInUser(req, res) {
    const { email, password } = req.body;
    try {
      User.findOne(email, foundUser => {
        if (foundUser.length === 0) {
          return res.status(404).json({
            success: false,
            error: 'User has no account',
          });
        }
        if (Crypt.isMatchDbPassword(password, foundUser[0].password)) {
          return res.status(200).json({
            success: true,
            token: JwtAuthenticate.jwtEncode(foundUser[0].user_id),
          });
        }
        return res.status(400).json({
          success: false,
          error: 'Password incorrect',
        });
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected results',
      });
    }
  }
}

export default AuthController;
