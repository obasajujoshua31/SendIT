import User from '../models/user';

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
}

export default UserController;
