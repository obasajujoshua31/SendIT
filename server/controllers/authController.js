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
      User.save(newUser, theNewRegisteredUser => {
        return res.status(201).json({
          success: true,
          data: theNewRegisteredUser,
          message: 'user signed Up successfully',
        });
      });
    });
  }

  static signInUser(req, res) {
    const { email, password } = req.body;
    User.findOne(email, foundUser => {
      if (foundUser.length === 0) {
        res.status(404).json({
          success: false,
          error: 'User has no account',
        });
      } else if (Crypt.isMatchDbPassword(password, foundUser[0].password)) {
        res.status(200).json({
          success: true,
          token: JwtAuthenticate.jwtEncode(foundUser[0].user_id),
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
