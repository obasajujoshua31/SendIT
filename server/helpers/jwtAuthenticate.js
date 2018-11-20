import jwt from 'jsonwebtoken';

class JwtAuthenticate {
  static jwtEncode(userId) {
    return jwt.sign({ userId }, process.env.jwtcode);
  }

  static jwtVerifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      jwt.verify(bearer[1], process.env.jwtcode, err => {
        if (err) {
          res.status(403).json({
            success: false,
            error: 'You are not authorized',
          });
        } else {
          next();
        }
      });
    } else {
      res.status(403).json({
        success: false,
        error: 'You are not authorized',
      });
    }
  }
}
export default JwtAuthenticate;
