import getResponseFromDB from './getResponseFromDB';

class User {
  static save(user, callback) {
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
    getResponseFromDB(sql, params, callback);
  }

  static findOne(email, callback) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    const params = [email];
    getResponseFromDB(sql, params, callback);
  }

  static findById(id, callback) {
    const sql =
      'SELECT email, password, user_id, is_admin FROM users WHERE user_id = $1';
    const params = [id];
    getResponseFromDB(sql, params, callback);
  }

  static remove(callback) {
    const sql = 'DELETE FROM users WHERE email = $1 RETURNING *';
    const params = ['kennethafolabi@gmail.com'];
    getResponseFromDB(sql, params, callback);
  }

  static getAll(callback) {
    const sql = 'SELECT * FROM users';
    getResponseFromDB(sql, null, callback);
  }

  static findOneAndUpdate(email, password, callback) {
    const sql = 'UPDATE users SET password = $1 WHERE email = $2 RETURNING *';
    const params = [password, email];
    getResponseFromDB(sql, params, callback);
  }
}
export default User;
