import bcrypt from 'bcryptjs';

class Bcrypt {
  /**
   * @param  {String} password
   * @return  {String} encrypt
   */

  static encrypt(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
  /**
   * @param  {String} password
   * @param  {String} dbPassword
   * @return {Boolean} isMatchDbPassword
   */

  static isMatchDbPassword(password, dbPassword) {
    return bcrypt.compareSync(password, dbPassword);
  }
}

export default Bcrypt;
