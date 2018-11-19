import User from '../models/user';
import Crypt from '../helpers/crypt';

class AuthController {
  static signUpUser(req, res) {
    const { firstName, lastName, username, email, password } = req.body;

    User.findOne(email, results => {
      if (results.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Email is already used',
        });
      }
    });
    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password: Crypt.encrypt(password),
      isAdmin: false,
    };
    User.save(newUser, theuser => {
      if (theuser.length === 0) {
        return res.status(500).json({
          success: false,
          error: 'Server error',
        });
      }
      return res.status(201).json({
        success: true,
        data: theuser,
        message: 'user signed Up successfully',
      });
    });
  }
}

export default AuthController;
