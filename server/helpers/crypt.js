import bcrypt from 'bcryptjs';

class Bcrypt {
  static encrypt(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static isMatchDbPassword(password, dbPassword) {
    return bcrypt.compareSync(password, dbPassword);
  }
}

export default Bcrypt;
