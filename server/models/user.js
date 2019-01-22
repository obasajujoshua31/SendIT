import getResponseFromDB from './getResponseFromDB';

class User {
  /**
   * @param  {Object} user
   * @param  {String} firstName
   * @param  {String } lastName
   * @param  {String} email
   * @param  {String} password
   * @param  {Boolean} isAdmin
   * @return  {Array} save
   */
  static async save(user) {
    const { firstName, lastName, email, password, isAdmin } = user;
    const registeredOn = new Date();
    const sql =
      'INSERT INTO users (first_name, last_name, email, password, is_admin, registered_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const params = [
      firstName,
      lastName,
      email,
      password,
      isAdmin,
      registeredOn,
    ];
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @param  {String} email
   * @return  {Array} findOne
   */
  static async findOne(email) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    const params = [email];
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @param  {Number} id
   * @return  {Array} findById
   */
  static async findById(id) {
    const sql =
      'SELECT email, password, user_id, is_admin FROM users WHERE user_id = $1';
    const params = [id];
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @return  {null} remove
   */
  static async remove() {
    const sql = 'DELETE FROM users WHERE email = $1 RETURNING *';
    const params = ['kennethafolabi@gmail.com'];
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @return  {Array} getAll
   */

  static async getAll() {
    const sql = 'SELECT * FROM users';
    try {
      return await getResponseFromDB(sql, null);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @param  {String} email
   * @param  {String} password
   * @return  {Array} findOneAndUpdate
   */
  static async findOneAndUpdate(email, password) {
    const sql = 'UPDATE users SET password = $1 WHERE email = $2 RETURNING *';
    const params = [password, email];
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
}
export default User;
